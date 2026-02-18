package com.innerroot.controller;

import com.innerroot.dto.*;
import com.innerroot.model.User;
import com.innerroot.repository.UserRepository;
import com.innerroot.service.AuthService;
import com.innerroot.service.GoogleOAuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
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

    /**
     * POST /api/auth/register
     * Register a new user with email/password
     */
    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody SignupRequest request) {
        try {
            AuthResponse response = authService.register(request);
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    /**
     * POST /api/auth/login
     * Login with email/password
     */
    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest request) {
        try {
            AuthResponse response = authService.login(request);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "Invalid email or password"));
        }
    }

    /**
     * POST /api/auth/google
     * Authenticate via Google OAuth access token
     */
    @PostMapping("/google")
    public ResponseEntity<?> googleAuth(@Valid @RequestBody GoogleAuthRequest request) {
        try {
            // Verify the access token with Google
            Map<String, Object> googleUser = googleOAuthService.verifyAccessToken(request.getAccessToken());

            String email = (String) googleUser.get("email");
            String name = (String) googleUser.get("name");
            String picture = (String) googleUser.get("picture");
            String googleId = (String) googleUser.get("sub");

            // Login or register the Google user
            AuthResponse response = authService.googleAuth(email, name, picture, googleId);
            return ResponseEntity.ok(response);

        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "Google authentication failed: " + e.getMessage()));
        }
    }

    /**
     * GET /api/auth/me
     * Get current authenticated user's profile
     */
    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(@AuthenticationPrincipal UserDetails userDetails) {
        if (userDetails == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "Not authenticated"));
        }

        User user = userRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        java.util.HashMap<String, Object> response = new java.util.HashMap<>();
        response.put("id", user.getId());
        response.put("name", user.getName());
        response.put("email", user.getEmail());
        response.put("profilePicture", user.getProfilePicture() != null ? user.getProfilePicture() : "");
        response.put("role", user.getRole().name());
        response.put("provider", user.getProvider().name());
        response.put("createdAt", user.getCreatedAt() != null ? user.getCreatedAt().toString() : "");
        response.put("interests", user.getInterests() != null ? user.getInterests() : "");
        response.put("meditationStreak", user.getMeditationStreak() != null ? user.getMeditationStreak() : 0);
        response.put("longestStreak", user.getLongestStreak() != null ? user.getLongestStreak() : 0);
        response.put("totalSessions", user.getTotalSessions() != null ? user.getTotalSessions() : 0);
        response.put("unlockedBadges", user.getUnlockedBadges() != null ? user.getUnlockedBadges() : "");
        return ResponseEntity.ok(response);
    }
}
