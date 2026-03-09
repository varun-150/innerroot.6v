package com.innerroot.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
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

    @NotBlank
    private String title;

    private String type; // meditation, yoga, chanting, breathing

    @Column(columnDefinition = "TEXT")
    @Size(max = 2000)
    private String description;

    private String duration;

    private String difficulty; // beginner, intermediate, advanced

    private String audioUrl;

    private String imageUrl;
}
