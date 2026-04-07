package com.innerroot.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(length = 36)
    private String id;

    @NotBlank
    @Size(max = 100)
    @Column(length = 100)
    private String name;

    @NotBlank
    @Email
    @Size(max = 150)
    @Column(unique = true, length = 150)
    private String email;

    @Size(max = 255)
    @Column(length = 255)
    private String password;

    @Size(max = 500)
    @Column(length = 500)
    private String profilePicture;

    @Enumerated(EnumType.STRING)
    private AuthProvider provider;

    private String providerId;

    @Builder.Default
    @Enumerated(EnumType.STRING)
    private Role role = Role.USER;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    // Onboarding fields
    @Size(max = 500)
    @Column(length = 500)
    private String learningGoals;

    @Size(max = 500)
    @Column(length = 500)
    private String usageIntent;

    @Size(max = 100)
    @Column(length = 100)
    private String occupation;

    private Integer age;

    @Size(max = 20)
    @Column(length = 20)
    private String ageGroup;

    @Size(max = 300)
    @Column(length = 300)
    private String address;

    @Size(max = 200)
    @Column(length = 200)
    private String region;

    // Personalization
    @Size(max = 500)
    @Column(length = 500)
    private String interests; // comma-separated: yoga,heritage,texts,wellness

    // Progress tracking
    @Builder.Default
    private Integer meditationStreak = 0;

    @Builder.Default
    private Integer longestStreak = 0;

    @Builder.Default
    private Integer totalSessions = 0;

    @Size(max = 1000)
    @Column(length = 1000)
    private String unlockedBadges; // comma-separated badge IDs

    @Builder.Default
    private Boolean onboardingCompleted = false;

    @Builder.Default
    private Boolean active = true;

    private LocalDateTime lastLogin;

    public enum AuthProvider {
        LOCAL, GOOGLE
    }

    public enum Role {
        USER, ADMIN
    }
}
