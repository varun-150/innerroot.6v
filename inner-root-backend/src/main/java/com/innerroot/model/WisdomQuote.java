package com.innerroot.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "wisdom_quotes")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class WisdomQuote {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(columnDefinition = "TEXT")
    private String quote;

    private String source;

    private String theme;
}
