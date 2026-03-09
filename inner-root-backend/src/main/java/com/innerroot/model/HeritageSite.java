package com.innerroot.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

@Entity
@Table(name = "heritage_sites")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class HeritageSite {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @NotBlank
    private String name;

    private String location;

    @Column(columnDefinition = "TEXT")
    @Size(max = 2000)
    private String description;

    private Double rating;

    private Integer reviews;

    @NotBlank
    private String imageUrl;

    private String videoUrl;

    private String category;
}
