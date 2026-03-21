package com.innerroot.controller;

import com.innerroot.model.MoodEntry;
import com.innerroot.model.User;
import com.innerroot.repository.MoodEntryRepository;
import com.innerroot.repository.UserRepository;
import com.innerroot.service.WebhookService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/mood")
@RequiredArgsConstructor
public class MoodController {

    private final MoodEntryRepository moodRepository;
    private final UserRepository userRepository;
    private final WebhookService webhookService;

    @GetMapping
    public ResponseEntity<List<MoodEntry>> getUserMoods() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = auth.getName();
        User user = userRepository.findByEmail(email)
                .orElse(null);

        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        return ResponseEntity.ok(moodRepository.findByUserOrderByCreatedAtDesc(user));
    }

    @PostMapping
    public ResponseEntity<MoodEntry> saveMood(@Valid @RequestBody MoodEntry entry) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = auth.getName();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        entry.setUser(user);
        MoodEntry saved = moodRepository.save(entry);

        // Trigger automation for Mood-based guidance
        webhookService.triggerEvent("MOOD_LOGGED", Map.of(
            "email", user.getEmail(),
            "name", user.getName(),
            "mood", saved.getMood() != null ? saved.getMood() : "",
            "intensity", saved.getIntensity() != null ? saved.getIntensity() : 0,
            "notes", saved.getNotes() != null ? saved.getNotes() : ""
        ));

        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }
}
