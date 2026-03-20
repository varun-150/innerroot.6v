package com.innerroot.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "japa_logs")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class JapaLog {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    private Integer beadsCount;
    private Integer totalMalas;
    private String mantra; // Optional: name of mantra if any

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;
}
