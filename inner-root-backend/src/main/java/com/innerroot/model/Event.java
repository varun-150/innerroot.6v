package com.innerroot.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

@Entity
@Table(name = "events")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @NotBlank
    private String title;

    private String dateString; // Keeping as String for simplicity to match frontend "Tomorrow, 5:30 AM"

    private String type; // e.g., "tour", "study", "wellness"

    @Column(columnDefinition = "TEXT")
    @Size(max = 2000)
    private String description;
}
