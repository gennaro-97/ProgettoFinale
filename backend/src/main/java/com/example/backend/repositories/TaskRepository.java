package com.example.backend.repositories;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backend.models.Task;

public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findByUtenteId(Long utenteId);
    List<Task> findByUtenteIdAndRisoltaTrue(Long utenteId);
    List<Task> findByUtenteIdAndRisoltaFalse(Long utenteId);
}
