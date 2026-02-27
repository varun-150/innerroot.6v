package com.innerroot.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "library_items")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LibraryItem {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    private String title;

    private String category;

    @Column(columnDefinition = "TEXT")
    private String description;

    private String chapters;

    private String author;

    private String fileUrl;

    private String readTime;
    private String link;
    private String image;
}
