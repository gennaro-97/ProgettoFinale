package com.example.backend.models;

import com.example.backend.enums.TipoLavoro;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "tasks")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String titolo;

    @Column(nullable = false)
    private String descrizione;

    @Column(nullable = false)
    private LocalDateTime dataInizio;

    @Column(nullable = false)
    private LocalDateTime dataFine;

    @Column(nullable = true)
    private Boolean risolta;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TipoLavoro tipoLavoro;

    @ManyToOne
    @JoinColumn(name = "utente_id", nullable = false)
    private Utente utente;
}
