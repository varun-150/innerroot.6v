package com.innerroot.controller;

import com.innerroot.model.User;
import com.innerroot.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final UserRepository userRepository;
    private final CultureItemRepository cultureItemRepository;
    private final HeritageSiteRepository heritageSiteRepository;
    private final WellnessContentRepository wellnessContentRepository;
    private final LibraryItemRepository libraryItemRepository;
    private final WisdomQuoteRepository wisdomQuoteRepository;
    private final EventRepository eventRepository;

    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userRepository.findAll());
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable String id) {
        if (userRepository.existsById(id)) {
            userRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    @PatchMapping("/users/{id}/role")
    public ResponseEntity<User> updateUserRole(@PathVariable String id, @RequestBody Map<String, String> body) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        String roleStr = body.get("role");
        if (roleStr != null) {
            user.setRole(User.Role.valueOf(roleStr));
            return ResponseEntity.ok(userRepository.save(user));
        }
        return ResponseEntity.badRequest().build();
    }

    @GetMapping("/stats")
    public ResponseEntity<Map<String, Long>> getStats() {
        Map<String, Long> stats = new HashMap<>();
        stats.put("totalUsers", userRepository.count());
        stats.put("totalCultureItems", cultureItemRepository.count());
        stats.put("totalHeritageSites", heritageSiteRepository.count());
        stats.put("totalWellnessContent", wellnessContentRepository.count());
        stats.put("totalLibraryItems", libraryItemRepository.count());
        stats.put("totalWisdomQuotes", wisdomQuoteRepository.count());
        stats.put("totalEvents", eventRepository.count());
        return ResponseEntity.ok(stats);
    }

    // --- Content Management CRUD ---

    @GetMapping("/entities/{type}")
    public ResponseEntity<List<?>> getAllEntities(@PathVariable String type) {
        return switch (type) {
            case "heritage" -> ResponseEntity.ok(heritageSiteRepository.findAll());
            case "wellness" -> ResponseEntity.ok(wellnessContentRepository.findAll());
            case "events" -> ResponseEntity.ok(eventRepository.findAll());
            case "library" -> ResponseEntity.ok(libraryItemRepository.findAll());
            case "culture" -> ResponseEntity.ok(cultureItemRepository.findAll());
            case "wisdom" -> ResponseEntity.ok(wisdomQuoteRepository.findAll());
            default -> ResponseEntity.badRequest().build();
        };
    }

    @DeleteMapping("/entities/{type}/{id}")
    public ResponseEntity<Void> deleteEntity(@PathVariable String type, @PathVariable String id) {
        switch (type) {
            case "heritage" -> heritageSiteRepository.deleteById(id);
            case "wellness" -> wellnessContentRepository.deleteById(id);
            case "events" -> eventRepository.deleteById(id);
            case "library" -> libraryItemRepository.deleteById(id);
            case "culture" -> cultureItemRepository.deleteById(id);
            case "wisdom" -> wisdomQuoteRepository.deleteById(id);
            default -> { return ResponseEntity.badRequest().build(); }
        }
        return ResponseEntity.noContent().build();
    }

    // --- Advanced User Management ---

    @PostMapping("/users")
    public ResponseEntity<User> createUser(@RequestBody User newUser) {
        // Enforce default values
        if (newUser.getPassword() == null) newUser.setPassword("InnerRoot2026!");
        if (newUser.getRole() == null) newUser.setRole(User.Role.USER);
        newUser.setActive(true);
        return ResponseEntity.status(201).body(userRepository.save(newUser));
    }

    @PutMapping("/users/{id}")
    public ResponseEntity<User> updateUser(@PathVariable String id, @RequestBody User userData) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        user.setName(userData.getName());
        user.setEmail(userData.getEmail());
        if (userData.getRole() != null) user.setRole(userData.getRole());
        return ResponseEntity.ok(userRepository.save(user));
    }

    @PostMapping("/users/{id}/reset-password")
    public ResponseEntity<Void> resetPassword(@PathVariable String id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        user.setPassword("InnerRoot2026!"); // Set default temporary password
        userRepository.save(user);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/users/{id}/status")
    public ResponseEntity<User> toggleUserStatus(@PathVariable String id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        user.setActive(!user.getActive());
        return ResponseEntity.ok(userRepository.save(user));
    }
}
