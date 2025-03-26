package com.example.backend.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backend.models.UtenteTasksDelGiorno;

public interface UtenteTasksDelGiornoRepository extends JpaRepository<UtenteTasksDelGiorno, Long>{
    List<UtenteTasksDelGiorno> findByUtenteId(Long utenteId);
}
