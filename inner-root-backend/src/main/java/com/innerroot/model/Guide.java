package com.innerroot.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

@Entity
@Table(name = "guides")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Guide {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @NotBlank
    private String name;

    private String specialty;

    @NotBlank
    private String status; // e.g., "online", "away"

    private String imageUrl; // Optional, for future use
}
