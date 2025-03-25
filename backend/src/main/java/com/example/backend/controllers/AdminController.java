package com.example.backend.controllers;

import com.example.backend.models.TaskDelGiorno;
import com.example.backend.services.TaskDelGiornoService;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {
    private final TaskDelGiornoService taskDelGiornoService;

    // Ottieni tutte le task del giorno
    @GetMapping("/tasks-del-giorno")
    public List<TaskDelGiorno> getAllTasksDelGiorno() {
        return taskDelGiornoService.getAllTasksDelGiorno();
    }

    // Aggiungi una nuova task del giorno
    @PostMapping("/tasks-del-giorno")
    public void addTaskDelGiorno(@RequestBody TaskDelGiorno taskDelGiorno) {
        taskDelGiornoService.addTaskDelGiorno(taskDelGiorno);
    }

    // Elimina una task del giorno per ID
    @DeleteMapping("/tasks-del-giorno/{id}")
    public void deleteTaskDelGiorno(@PathVariable Long id) {
        taskDelGiornoService.deleteTaskDelGiornoById(id);
    }
}
