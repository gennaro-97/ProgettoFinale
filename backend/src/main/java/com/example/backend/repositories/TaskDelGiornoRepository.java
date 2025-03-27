package com.example.backend.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backend.models.TaskDelGiorno;
import java.time.LocalDateTime;


public interface TaskDelGiornoRepository extends JpaRepository<TaskDelGiorno, Long> {
    List<TaskDelGiorno> findByGiornoDellaTask(LocalDateTime giornoDellaTask);
}
