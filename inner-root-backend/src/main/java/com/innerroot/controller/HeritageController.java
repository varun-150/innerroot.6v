package com.innerroot.controller;

import com.innerroot.model.HeritageSite;
import com.innerroot.repository.HeritageSiteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

import java.util.List;

@RestController
@RequestMapping("/api/heritage-sites")
@RequiredArgsConstructor
public class HeritageController {

    private final HeritageSiteRepository repository;

    @GetMapping
    public ResponseEntity<List<HeritageSite>> getAll(@RequestParam(required = false) String category,
            @RequestParam(required = false) String search) {
        if (search != null && !search.isBlank()) {
            return ResponseEntity.ok(repository.findByNameContainingIgnoreCase(search));
        }
        if (category != null && !category.isBlank()) {
            return ResponseEntity.ok(repository.findByCategory(category));
        }
        return ResponseEntity.ok(repository.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<HeritageSite> getById(@PathVariable String id) {
        return repository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<HeritageSite> create(@Valid @RequestBody HeritageSite site) {
        return ResponseEntity.status(HttpStatus.CREATED).body(repository.save(site));
    }

    @PutMapping("/{id}")
    public ResponseEntity<HeritageSite> update(@PathVariable String id, @Valid @RequestBody HeritageSite site) {
        return repository.findById(id).map(existing -> {
            existing.setName(site.getName());
            existing.setLocation(site.getLocation());
            existing.setDescription(site.getDescription());
            existing.setRating(site.getRating());
            existing.setReviews(site.getReviews());
            existing.setImageUrl(site.getImageUrl());
            existing.setCategory(site.getCategory());
            return ResponseEntity.ok(repository.save(existing));
        }).orElse(ResponseEntity.notFound().build());
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
