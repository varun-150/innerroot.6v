package com.innerroot.model;

import jakarta.persistence.*;
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

    private String title;

    private String category;

    @Column(columnDefinition = "TEXT")
    private String description;

    private String image;

    private String wikiUrl;
}
