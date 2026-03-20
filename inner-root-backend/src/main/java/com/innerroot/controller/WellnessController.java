package com.innerroot.controller;

import com.innerroot.model.WellnessContent;
import com.innerroot.repository.WellnessContentRepository;
import com.innerroot.service.wellness.WellnessRecommendationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/wellness")
@RequiredArgsConstructor
public class WellnessController {

    private final WellnessContentRepository repository;
    private final WellnessRecommendationService recommendationService;

    @GetMapping("/recommend")
    public ResponseEntity<Map<String, String>> getRecommendation(@RequestParam String mood, @RequestParam(defaultValue = "5") String intensity) {
        return ResponseEntity.ok(recommendationService.getRecommendation(mood, intensity));
    }

    @GetMapping
    public ResponseEntity<List<WellnessContent>> getAll(@RequestParam(required = false) String type) {
        if (type != null && !type.isBlank()) {
            return ResponseEntity.ok(repository.findByType(type));
        }
        return ResponseEntity.ok(repository.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<WellnessContent> getById(@PathVariable String id) {
        return repository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<WellnessContent> create(@Valid @RequestBody WellnessContent content) {
        return ResponseEntity.status(HttpStatus.CREATED).body(repository.save(content));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable String id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
