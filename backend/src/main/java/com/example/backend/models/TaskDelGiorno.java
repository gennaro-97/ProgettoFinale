package com.example.backend.models;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.Set;

import com.example.backend.enums.TipoLavoro;

@Entity
@Table(name = "tasks_del_giorno")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class TaskDelGiorno {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String titolo;

    @Column(nullable = false)
    private String descrizione;

    @Column(nullable = false)
    private LocalDateTime giornoDellaTask;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TipoLavoro tipoLavoro;

    // Relazione Many-to-Many con Utente tramite tabella intermedia
    @OneToMany(mappedBy = "taskDelGiorno", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<UtenteTasksDelGiorno> utentiAssegnati;
}
