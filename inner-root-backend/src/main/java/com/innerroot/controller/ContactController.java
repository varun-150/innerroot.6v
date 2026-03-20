package com.innerroot.controller;

import com.innerroot.model.ContactMessage;
import com.innerroot.repository.ContactMessageRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/contact")
@RequiredArgsConstructor
public class ContactController {

    private final ContactMessageRepository contactMessageRepository;

    /**
     * POST /api/contact
     * Submit a contact message — saved to MySQL
     */
    @PostMapping
    public ResponseEntity<?> submitContact(@Valid @RequestBody ContactMessage message) {
        try {
            message.setStatus("new");
            ContactMessage saved = contactMessageRepository.save(message);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(Map.of(
                            "id", saved.getId(),
                            "message", "Your message has been received. We'll be in touch soon!",
                            "status", "success"
                    ));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Failed to save your message. Please try again."));
        }
    }

    /**
     * GET /api/contact (Admin only — no security guard here for simplicity)
     * Retrieve all contact messages
     */
    @GetMapping
    public ResponseEntity<?> getAllMessages() {
        return ResponseEntity.ok(contactMessageRepository.findAllByOrderByCreatedAtDesc());
    }
}
