package com.innerroot.service;

import com.innerroot.dto.*;
import com.innerroot.model.User;
import com.innerroot.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private static final Logger logger = LoggerFactory.getLogger(AuthService.class);

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    public AuthResponse register(SignupRequest request) {
        // Check if email already exists
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email address is already registered");
        }

        // Create new user
        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .provider(User.AuthProvider.LOCAL)
                .role(User.Role.USER)
                .learningGoals(request.getLearningGoals())
                .usageIntent(request.getUsageIntent())
                .occupation(request.getOccupation())
                .ageGroup(request.getAgeGroup())
                .region(request.getRegion())
                .interests(request.getInterests())
                .build();

        User savedUser = userRepository.save(user);
        logger.info("New user registered: {}", savedUser.getEmail());

        return new AuthResponse(
                savedUser.getId(),
                savedUser.getName(),
                savedUser.getEmail(),
                savedUser.getProfilePicture(),
                savedUser.getRole().name(),
                savedUser.getInterests(),
                savedUser.getMeditationStreak(),
                savedUser.getLongestStreak(),
                savedUser.getTotalSessions(),
                savedUser.getUnlockedBadges());
    }

    public AuthResponse login(LoginRequest request) {
        // Authenticate
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        logger.info("User logged in: {}", user.getEmail());

        return new AuthResponse(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getProfilePicture(),
                user.getRole().name(),
                user.getInterests(),
                user.getMeditationStreak(),
                user.getLongestStreak(),
                user.getTotalSessions(),
                user.getUnlockedBadges());
    }

    public AuthResponse googleAuth(String email, String name, String picture, String googleId) {
        // Find or create user
        User user = userRepository.findByEmail(email).orElse(null);

        if (user == null) {
            // Register new Google user
            user = User.builder()
                    .name(name)
                    .email(email)
                    .profilePicture(picture)
                    .provider(User.AuthProvider.GOOGLE)
                    .providerId(googleId)
                    .role(User.Role.USER)
                    .build();
            user = userRepository.save(user);
            logger.info("New Google user registered: {}", email);
        } else {
            // Update existing user's profile picture
            user.setProfilePicture(picture);
            user.setName(name);
            user = userRepository.save(user);
            logger.info("Google user logged in: {}", email);
        }

        return new AuthResponse(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getProfilePicture(),
                user.getRole().name(),
                user.getInterests(),
                user.getMeditationStreak(),
                user.getLongestStreak(),
                user.getTotalSessions(),
                user.getUnlockedBadges());
    }
}
