package com.innerroot.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "wellness_content")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class WellnessContent {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    private String title;

    private String type; // meditation, yoga, chanting, breathing

    @Column(columnDefinition = "TEXT")
    private String description;

    private String duration;

    private String difficulty; // beginner, intermediate, advanced

    private String audioUrl;

    private String imageUrl;
}
