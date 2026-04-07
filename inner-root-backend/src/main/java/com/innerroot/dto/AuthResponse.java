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
}
