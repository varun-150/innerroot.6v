package com.innerroot.model;

import jakarta.persistence.*;
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

    private String name;

    private String location;

    @Column(columnDefinition = "TEXT")
    private String description;

    private Double rating;

    private Integer reviews;

    private String imageUrl;

    private String videoUrl;

    private String category;
}
