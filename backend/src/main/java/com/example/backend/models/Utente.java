package com.example.backend.models;

import java.util.Set;

import com.example.backend.enums.Ruolo;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "utenti")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Utente {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String username;

    @Column(nullable = false)
    private String password;

    @Column(unique = true, nullable = false)
    private String email;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Ruolo ruolo;

    // Relazione Many-to-Many con TasksDelGiorno
    @OneToMany(mappedBy = "utente", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<UtenteTasksDelGiorno> tasksDelGiorno;
}
