package com.example.backend.services;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.backend.models.DatiUtente;
import com.example.backend.repositories.DatiUtenteRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;


@Service
@RequiredArgsConstructor
public class DatiUtenteService {
    private final DatiUtenteRepository datiUtenteRepository;


    @Transactional
    public void saveDatiUtente(DatiUtente datiUtente) {
        datiUtenteRepository.save(datiUtente);
    }

    @Transactional
    public DatiUtente aggiornaDatiUtente(Long utenteId, double nuovoPeso, double nuovaAltezza) {
        // Trova i dati dell'utente esistenti
        DatiUtente datiUtente = datiUtenteRepository.findByUtenteId(utenteId)
                .orElseThrow(() -> new RuntimeException("Dati utente non trovati per ID utente: " + utenteId));

        // Aggiorna i valori
        datiUtente.setPeso(nuovoPeso);
        datiUtente.setAltezza(nuovaAltezza);

        // Il metodo @PreUpdate calcola automaticamente l'IMC prima di salvare
        return datiUtenteRepository.save(datiUtente);
    }

    public Optional<DatiUtente> getDatiUtente(Long utenteId) {
        return datiUtenteRepository.findByUtenteId(utenteId);
    }



}
