package com.innerroot.controller;

import com.innerroot.model.MoodEntry;
import com.innerroot.model.User;
import com.innerroot.repository.MoodEntryRepository;
import com.innerroot.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

import java.util.List;

@RestController
@RequestMapping("/api/mood")
@RequiredArgsConstructor
public class MoodController {

    private final MoodEntryRepository moodRepository;
    private final UserRepository userRepository;

    @GetMapping
    public ResponseEntity<List<MoodEntry>> getUserMoods() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = auth.getName();
        User user = userRepository.findByEmail(email)
                .orElse(null);

        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        return ResponseEntity.ok(moodRepository.findByUserOrderByTimestampDesc(user));
    }

    @PostMapping
    public ResponseEntity<MoodEntry> saveMood(@Valid @RequestBody MoodEntry entry) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = auth.getName();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        entry.setUser(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(moodRepository.save(entry));
    }
}
