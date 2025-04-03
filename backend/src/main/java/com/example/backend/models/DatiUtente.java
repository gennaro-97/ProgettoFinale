package com.example.backend.models;

import java.time.Year;

import com.example.backend.enums.Sesso;

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

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Sesso sesso; 

    @Column(nullable = false)
    private int annoNascita;

    @Column(nullable = false)
    private double stileVita; // 1.2 sedentario, 1.375 leggermente attivo, 1.55 moderatamente attivo, 1.725 molto attivo, 1.9 estremamente attivo

    @Column(nullable = false)
    private double ibm; // Calcolato automaticamente

    @Column(nullable = false)
    private double bmr; // Calcolato automaticamente

    @OneToOne
    @JoinColumn(name = "id_utente", referencedColumnName = "id", nullable = false)
    private Utente utente;

    // Metodo per calcolare l'IMC automaticamente prima di salvare
      // Metodo per calcolare l'IMC e il BMR automaticamente prima di salvare
    @PrePersist
    @PreUpdate
    private void calcolaValori() {
        if (altezza > 0) {
            this.ibm = peso / (altezza * altezza);
        }

        int annoCorrente = Year.now().getValue();
        int eta = annoCorrente - annoNascita;

        if (sesso == Sesso.MASCHIO) {
            this.bmr = 88.362 + (13.397 * peso) + (4.799 * altezza * 100) - (5.677 * eta);
        } else if (sesso == Sesso.FEMMINA) {
            this.bmr = 447.593 + (9.247 * peso) + (3.098 * altezza * 100) - (4.330 * eta);
        }
    }
}
