package com.innerroot.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "mood_entries")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MoodEntry {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    private String mood; // happy, sad, anxious, calm

    private String note;

    private Integer intensity; // 1-10

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime timestamp;
}
