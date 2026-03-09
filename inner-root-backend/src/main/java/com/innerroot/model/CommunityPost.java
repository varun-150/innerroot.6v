package com.innerroot.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "community_posts")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CommunityPost {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @NotBlank
    private String title;

    @Column(columnDefinition = "TEXT")
    @NotBlank
    @Size(max = 2000)
    @Builder.Default
    private String content = "Click to read more about this discussion.";

    private String author;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @Builder.Default
    private Integer replies = 0;

    @Builder.Default
    private Integer views = 0;

    @Builder.Default
    private Integer likes = 0;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;
}
