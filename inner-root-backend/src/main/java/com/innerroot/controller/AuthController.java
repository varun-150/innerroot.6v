package com.innerroot.controller;

import com.innerroot.dto.*;
import com.innerroot.model.RefreshToken;
import com.innerroot.model.User;
import com.innerroot.repository.UserRepository;
import com.innerroot.security.JwtTokenProvider;
import com.innerroot.service.AuthService;
import com.innerroot.service.GoogleOAuthService;
import com.innerroot.service.RefreshTokenService;
import com.innerroot.service.WebhookService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    private final GoogleOAuthService googleOAuthService;
    private final UserRepository userRepository;
    private final WebhookService webhookService;
    private final JwtTokenProvider jwtTokenProvider;
    private final RefreshTokenService refreshTokenService;

    /**
     * POST /api/auth/register
     */
    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody SignupRequest request) {
        try {
            AuthResponse response = authService.register(request);
            
            ResponseCookie jwtCookie = jwtTokenProvider.generateJwtCookie(response.getEmail());
            refreshTokenService.createRefreshToken(response.getId()); // Optional: Refresh tokens for new users

            webhookService.triggerEvent("USER_SIGNUP", Map.of(
                "email", request.getEmail(),
                "name", request.getName()
            ));

            return ResponseEntity.status(HttpStatus.CREATED)
                    .header(HttpHeaders.SET_COOKIE, jwtCookie.toString())
                    .body(response);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    /**
     * POST /api/auth/login
     */
    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest request) {
        try {
            AuthResponse authResponse = authService.login(request);
            ResponseCookie jwtCookie = jwtTokenProvider.generateJwtCookie(authResponse.getEmail());
            
            // Clean up old refresh tokens and create new one
            refreshTokenService.deleteByUserId(authResponse.getId());
            RefreshToken refreshToken = refreshTokenService.createRefreshToken(authResponse.getId());

            return ResponseEntity.ok()
                    .header(HttpHeaders.SET_COOKIE, jwtCookie.toString())
                    .body(Map.of("user", authResponse, "refreshToken", refreshToken.getToken()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "Invalid email or password"));
        }
    }

    /**
     * POST /api/auth/google
     */
    @PostMapping("/google")
    public ResponseEntity<?> googleAuth(@Valid @RequestBody GoogleAuthRequest request) {
        try {
            Map<String, Object> googleUser = googleOAuthService.verifyAccessToken(request.getAccessToken());

            String email = (String) googleUser.get("email");
            String name = (String) googleUser.get("name");
            String picture = (String) googleUser.get("picture");
            String googleId = (String) googleUser.get("sub");

            AuthResponse authResponse = authService.googleAuth(email, name, picture, googleId);
            ResponseCookie jwtCookie = jwtTokenProvider.generateJwtCookie(authResponse.getEmail());

            refreshTokenService.deleteByUserId(authResponse.getId());
            RefreshToken refreshToken = refreshTokenService.createRefreshToken(authResponse.getId());

            return ResponseEntity.ok()
                    .header(HttpHeaders.SET_COOKIE, jwtCookie.toString())
                    .body(Map.of("user", authResponse, "refreshToken", refreshToken.getToken()));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "Google authentication failed: " + e.getMessage()));
        }
    }

    /**
     * POST /api/auth/logout
     */
    @PostMapping("/logout")
    public ResponseEntity<?> logout(@AuthenticationPrincipal UserDetails userDetails) {
        if (userDetails != null) {
            User user = userRepository.findByEmail(userDetails.getUsername()).orElse(null);
            if (user != null) {
                refreshTokenService.deleteByUserId(user.getId());
            }
        }
        ResponseCookie jwtCookie = jwtTokenProvider.getCleanJwtCookie();
        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, jwtCookie.toString())
                .body(Map.of("message", "Logged out successfully"));
    }

    /**
     * POST /api/auth/refresh
     */
    @PostMapping("/refresh")
    public ResponseEntity<?> refreshToken(@RequestBody Map<String, String> request) {
        String refreshToken = request.get("refreshToken");
        return refreshTokenService.findByToken(refreshToken)
                .map(refreshTokenService::verifyExpiration)
                .map(RefreshToken::getUser)
                .map(user -> {
                    ResponseCookie jwtCookie = jwtTokenProvider.generateJwtCookie(user.getEmail());
                    return ResponseEntity.ok()
                            .header(HttpHeaders.SET_COOKIE, jwtCookie.toString())
                            .body(Map.of("message", "Token refreshed successfully"));
                })
                .orElse(ResponseEntity.status(HttpStatus.FORBIDDEN).body(Map.of("error", "Refresh token is not in database!")));
    }

    /**
     * GET /api/auth/me
     */
    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(@AuthenticationPrincipal UserDetails userDetails) {
        if (userDetails == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "Not authenticated"));
        }

        User user = userRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        return ResponseEntity.ok(Map.of(
            "id", user.getId(),
            "name", user.getName(),
            "email", user.getEmail(),
            "profilePicture", user.getProfilePicture() != null ? user.getProfilePicture() : "",
            "role", user.getRole().name(),
            "meditationStreak", user.getMeditationStreak() != null ? user.getMeditationStreak() : 0,
            "longestStreak", user.getLongestStreak() != null ? user.getLongestStreak() : 0,
            "totalSessions", user.getTotalSessions() != null ? user.getTotalSessions() : 0,
            "unlockedBadges", user.getUnlockedBadges() != null ? user.getUnlockedBadges() : ""
        ));
    }
}
