package com.innerroot.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "contact_messages")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ContactMessage {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @NotBlank
    @Size(max = 150)
    @Column(length = 150, nullable = false)
    private String name;

    @NotBlank
    @Email
    @Size(max = 200)
    @Column(length = 200, nullable = false)
    private String email;

    @NotBlank
    @Size(max = 2000)
    @Column(length = 2000, nullable = false, columnDefinition = "TEXT")
    private String message;

    @Builder.Default
    private String status = "new"; // new, read, replied

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;
}
