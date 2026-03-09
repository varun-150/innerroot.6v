package com.innerroot.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
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
    @NotBlank
    private String quote;

    private String source;

    private String theme;
}
