package com.example.backend.services;

import com.example.backend.models.UtenteTasksDelGiorno;
import com.example.backend.repositories.UtenteTasksDelGiornoRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UtenteTasksDelGiornoService {
    private final UtenteTasksDelGiornoRepository utenteTasksDelGiornoRepository;

    // Ottieni tutte le task del giorno per un utente specifico
    public List<UtenteTasksDelGiorno> getTasksByUtenteId(Long utenteId) {
        return utenteTasksDelGiornoRepository.findByUtenteId(utenteId);
    }

    // Assegna una nuova task del giorno a un utente
    @Transactional
    public UtenteTasksDelGiorno assignTaskToUtente(UtenteTasksDelGiorno utenteTask) {
        return utenteTasksDelGiornoRepository.save(utenteTask);
    }

    // Aggiorna lo stato di completamento della task
    @Transactional
    public UtenteTasksDelGiorno updateTaskCompletion(Long id, boolean completata) {
        Optional<UtenteTasksDelGiorno> utenteTaskOpt = utenteTasksDelGiornoRepository.findById(id);

        if (utenteTaskOpt.isPresent()) {
            UtenteTasksDelGiorno utenteTask = utenteTaskOpt.get();
            utenteTask.setCompletata(completata);
            return utenteTasksDelGiornoRepository.save(utenteTask);
        } else {
            throw new RuntimeException("Task non trovata per ID: " + id);
        }
    }
}
