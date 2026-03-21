package com.innerroot.controller;

import com.innerroot.model.JapaLog;
import com.innerroot.model.User;
import com.innerroot.repository.JapaLogRepository;
import com.innerroot.repository.UserRepository;
import com.innerroot.service.WebhookService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/japa")
@RequiredArgsConstructor
public class JapaController {

    private final JapaLogRepository japaLogRepository;
    private final UserRepository userRepository;
    private final WebhookService webhookService;

    @PostMapping
    public ResponseEntity<JapaLog> saveJapa(@AuthenticationPrincipal UserDetails userDetails, @RequestBody JapaLog log) {
        User user = userRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));
        log.setUser(user);
        JapaLog saved = japaLogRepository.save(log);

        // Trigger automation for Japa Milestone
        webhookService.triggerEvent("JAPA_COMPLETE", Map.of(
            "email", user.getEmail(),
            "name", user.getName(),
            "beadsCount", saved.getBeadsCount() != null ? saved.getBeadsCount() : 0,
            "totalMalas", saved.getTotalMalas() != null ? saved.getTotalMalas() : 0,
            "mantra", saved.getMantra() != null ? saved.getMantra() : ""
        ));

        return ResponseEntity.ok(saved);
    }

    @GetMapping
    public ResponseEntity<List<JapaLog>> getJapaHistory(@AuthenticationPrincipal UserDetails userDetails) {
        User user = userRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));
        return ResponseEntity.ok(japaLogRepository.findByUserIdOrderByCreatedAtDesc(user.getId()));
    }
}
