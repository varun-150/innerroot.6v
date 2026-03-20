package com.innerroot.controller;

import com.innerroot.model.User;
import com.innerroot.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserRepository userRepository;

    @PutMapping("/profile")
    public ResponseEntity<?> updateProfile(@AuthenticationPrincipal UserDetails userDetails, @RequestBody Map<String, Object> profileData) {
        if (userDetails == null) return ResponseEntity.status(401).build();

        User user = userRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (profileData.containsKey("name")) user.setName((String) profileData.get("name"));
        if (profileData.containsKey("profilePicture")) user.setProfilePicture((String) profileData.get("profilePicture"));
        if (profileData.containsKey("learningGoals")) user.setLearningGoals((String) profileData.get("learningGoals"));
        if (profileData.containsKey("occupation")) user.setOccupation((String) profileData.get("occupation"));
        if (profileData.containsKey("interests")) user.setInterests((String) profileData.get("interests"));
        
        User savedUser = userRepository.save(user);

        return ResponseEntity.ok(Map.of(
            "message", "Profile updated successfully",
            "name", savedUser.getName(),
            "profilePicture", savedUser.getProfilePicture() != null ? savedUser.getProfilePicture() : ""
        ));
    }
}
