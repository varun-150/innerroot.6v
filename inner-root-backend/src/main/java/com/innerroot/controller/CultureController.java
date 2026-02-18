package com.innerroot.controller;

import com.innerroot.model.CultureItem;
import com.innerroot.repository.CultureItemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/culture")
@RequiredArgsConstructor
public class CultureController {

    private final CultureItemRepository cultureItemRepository;

    @GetMapping
    public ResponseEntity<List<CultureItem>> getAllItems() {
        return ResponseEntity.ok(cultureItemRepository.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<CultureItem> getItemById(@PathVariable String id) {
        return cultureItemRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
