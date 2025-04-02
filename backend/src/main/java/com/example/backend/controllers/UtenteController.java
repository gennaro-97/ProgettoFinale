package com.example.backend.controllers;

import org.springframework.web.bind.annotation.*;

import com.example.backend.models.Utente;
import com.example.backend.services.UtenteService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/Utente")
@CrossOrigin(origins = "http://localhost:4200")
@RequiredArgsConstructor
public class UtenteController {
    private final UtenteService utenteService;

    @GetMapping("/{id}")
    public Utente getUtente(@PathVariable(name="id") Long id) {
        return utenteService.getUtenteById(id);
    }
}
