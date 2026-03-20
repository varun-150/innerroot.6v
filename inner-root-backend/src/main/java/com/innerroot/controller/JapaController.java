package com.innerroot.controller;

import com.innerroot.model.JapaLog;
import com.innerroot.model.User;
import com.innerroot.repository.JapaLogRepository;
import com.innerroot.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/japa")
@RequiredArgsConstructor
public class JapaController {

    private final JapaLogRepository japaLogRepository;
    private final UserRepository userRepository;

    @PostMapping
    public ResponseEntity<JapaLog> saveJapa(@AuthenticationPrincipal UserDetails userDetails, @RequestBody JapaLog log) {
        User user = userRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));
        log.setUser(user);
        return ResponseEntity.ok(japaLogRepository.save(log));
    }

    @GetMapping
    public ResponseEntity<List<JapaLog>> getJapaHistory(@AuthenticationPrincipal UserDetails userDetails) {
        User user = userRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));
        return ResponseEntity.ok(japaLogRepository.findByUserIdOrderByCreatedAtDesc(user.getId()));
    }
}
