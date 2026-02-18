package com.innerroot.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthResponse {
    private String token;
    @Builder.Default
    private String type = "Bearer";
    private String id;
    private String name;
    private String email;
    private String profilePicture;
    private String role;
    private String interests;
    private Integer meditationStreak;
    private Integer longestStreak;
    private Integer totalSessions;
    private String unlockedBadges;

    public AuthResponse(String token, String id, String name, String email, String profilePicture, String role,
            String interests, Integer meditationStreak, Integer longestStreak, Integer totalSessions,
            String unlockedBadges) {
        this.token = token;
        this.type = "Bearer";
        this.id = id;
        this.name = name;
        this.email = email;
        this.profilePicture = profilePicture;
        this.role = role;
        this.interests = interests;
        this.meditationStreak = meditationStreak;
        this.longestStreak = longestStreak;
        this.totalSessions = totalSessions;
        this.unlockedBadges = unlockedBadges;
    }
}
