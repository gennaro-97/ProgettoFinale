package com.example.backend.services;

import org.springframework.security.crypto.password.PasswordEncoder;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import com.example.backend.enums.Ruolo;
import com.example.backend.models.Utente;
import com.example.backend.repositories.UtenteRepository;

import jakarta.transaction.Transactional;

@Service
@RequiredArgsConstructor
public class UtenteService {
    private final UtenteRepository utenteRepository;
    private final PasswordEncoder passwordEncoder;

    public Utente getUtenteById(Long id) {
        return utenteRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Utente con ID " + id + " non trovato"));
    }

    public Utente findByUsername(String username) {
        return utenteRepository.findByUsername(username);
    }

    public Utente findByEmail(String email) {
        return utenteRepository.findByEmail(email);
    }

    @Transactional
    public Utente register(Utente utente) {
        if (utente.getRuolo() == null || utente.getRuolo().name() == null) {
            utente.setRuolo(Ruolo.ROLE_USER);
        }
        utente.setPassword(passwordEncoder.encode(utente.getPassword()));
        return utenteRepository.save(utente);
    }

}
