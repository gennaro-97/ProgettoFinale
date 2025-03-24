package com.example.backend.models;

import com.example.backend.enums.TipoLavoro;
import com.example.backend.enums.TipoTask;
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

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TipoLavoro tipoLavoro;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TipoTask tipoTask;

    @ManyToOne
    @JoinColumn(name = "utente_id", nullable = false)
    private Utente utente;
}
