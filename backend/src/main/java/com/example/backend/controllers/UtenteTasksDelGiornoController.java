package com.example.backend.controllers;

import com.example.backend.models.UtenteTasksDelGiorno;
import com.example.backend.services.UtenteTasksDelGiornoService;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/utente-tasks-del-giorno")
@RequiredArgsConstructor
public class UtenteTasksDelGiornoController {
    private final UtenteTasksDelGiornoService utenteTasksDelGiornoService;

    // Ottieni tutte le task del giorno per un utente specifico
    @GetMapping("/{utenteId}")
    public List<UtenteTasksDelGiorno> getTasksByUtenteId(@PathVariable Long utenteId) {
        return utenteTasksDelGiornoService.getTasksByUtenteId(utenteId);
    }

    // Assegna una task del giorno a un utente
    @PostMapping
    public UtenteTasksDelGiorno assignTaskToUtente(@RequestBody UtenteTasksDelGiorno utenteTask) {
        return utenteTasksDelGiornoService.assignTaskToUtente(utenteTask);
    }

    // Modifica lo stato di completamento della task del giorno
    @PutMapping("/{id}")
    public UtenteTasksDelGiorno updateTaskCompletion(@PathVariable Long id, @RequestParam boolean completata) {
        return utenteTasksDelGiornoService.updateTaskCompletion(id, completata);
    }
}
