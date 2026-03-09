package com.innerroot.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
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

    @NotBlank
    private String title;

    @NotBlank
    private String category;

    @Column(columnDefinition = "TEXT")
    @Size(max = 2000)
    private String description;

    private String chapters;

    private String author;

    @Builder.Default
    private String fileUrl = "";

    private String readTime;
    private String link;
    private String image;
}
