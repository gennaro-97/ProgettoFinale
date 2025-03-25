package com.example.backend.repositories;


import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backend.models.DatiUtente;

public interface DatiUtenteRepository extends JpaRepository<DatiUtente, Long> {
    Optional<DatiUtente> findByUtenteId(Long utenteId);
}
