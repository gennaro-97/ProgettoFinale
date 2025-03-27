package com.example.backend.models;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "dati_utente")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class DatiUtente {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private double peso;

    @Column(nullable = false)
    private double altezza;

    @Column(nullable = false)
    private double ibm; // Calcolato automaticamente

    @OneToOne
    @JoinColumn(name = "id_utente", referencedColumnName = "id", nullable = false)
    private Utente utente;

    // Metodo per calcolare l'IMC automaticamente prima di salvare
    @PrePersist
    @PreUpdate
    private void calcolaIBM() {
        if (altezza > 0) {
            this.ibm = peso / (altezza * altezza);
        }
    }
}
