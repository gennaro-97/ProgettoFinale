package com.example.backend.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import com.example.backend.models.Utente;
import com.example.backend.services.UtenteService;


@Controller
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
    private final UtenteService utenteService;

    @GetMapping("/{id}")
    public Utente getUtente(@PathVariable Long id) {
        return utenteService.getUtenteById(id);
    }

    @PostMapping("/register")
    public void register(@ModelAttribute Utente utente) {
        utenteService.register(utente);
    }
}
