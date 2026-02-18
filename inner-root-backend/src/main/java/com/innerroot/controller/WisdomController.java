package com.innerroot.controller;

import com.innerroot.model.WisdomQuote;
import com.innerroot.repository.WisdomQuoteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/api/wisdom")
@RequiredArgsConstructor
public class WisdomController {

    private final WisdomQuoteRepository repository;

    @GetMapping
    public ResponseEntity<List<WisdomQuote>> getAll() {
        return ResponseEntity.ok(repository.findAll());
    }

    @GetMapping("/random")
    public ResponseEntity<WisdomQuote> getRandom() {
        List<WisdomQuote> all = repository.findAll();
        if (all.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        Collections.shuffle(all);
        return ResponseEntity.ok(all.get(0));
    }

    @GetMapping("/theme/{theme}")
    public ResponseEntity<List<WisdomQuote>> getByTheme(@PathVariable String theme) {
        return ResponseEntity.ok(repository.findByTheme(theme));
    }
}
