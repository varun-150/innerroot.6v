package com.innerroot.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

@Entity
@Table(name = "culture_items")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CultureItem {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @NotBlank
    private String title;
    private String subtitle;
    private String category;
    private String origin;

    @Column(columnDefinition = "TEXT")
    @Size(max = 2000)
    private String description;

    @Column(columnDefinition = "TEXT")
    @Size(max = 2000)
    private String significance;

    private String image;
    private String wikiUrl;
    private String color;
}
