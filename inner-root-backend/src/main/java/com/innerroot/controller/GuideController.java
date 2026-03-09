package com.innerroot.controller;

import com.innerroot.model.Guide;
import com.innerroot.repository.GuideRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

import java.util.List;

@RestController
@RequestMapping("/api/guides")
@RequiredArgsConstructor
public class GuideController {

    private final GuideRepository repository;

    @GetMapping
    public ResponseEntity<List<Guide>> getAll() {
        return ResponseEntity.ok(repository.findAll());
    }

    @PostMapping
    public ResponseEntity<Guide> create(@Valid @RequestBody Guide guide) {
        return ResponseEntity.ok(repository.save(guide));
    }
}
