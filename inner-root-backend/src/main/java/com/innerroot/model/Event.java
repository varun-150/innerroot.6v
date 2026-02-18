package com.innerroot.model;

import jakarta.persistence.*;
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

    private String title;

    private String dateString; // Keeping as String for simplicity to match frontend "Tomorrow, 5:30 AM"

    private String type; // e.g., "tour", "study", "wellness"

    @Column(columnDefinition = "TEXT")
    private String description;
}
