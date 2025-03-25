package com.example.backend.models;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "utente_tasks_del_giorno")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class UtenteTasksDelGiorno {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "utente_id", nullable = false)
    private Utente utente;

    @ManyToOne
    @JoinColumn(name = "task_del_giorno_id", nullable = false)
    private TaskDelGiorno taskDelGiorno;

    @Column(nullable = false)
    private boolean completata = false;
}
