package com.example.backend.controllers;

import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import com.example.backend.models.Utente;
import com.example.backend.responses.AuthResponse;
import com.example.backend.responses.LoginRequest;
import com.example.backend.security.JwtUtil;
import com.example.backend.services.UtenteService;


@Controller
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthenticationManager authenticationManager;
    private final UtenteService utenteService;
    private final JwtUtil jwtUtil;

    @GetMapping("/{id}")
    public Utente getUtente(@PathVariable Long id) {
        return utenteService.getUtenteById(id);
    }

    @PostMapping("/register")
    public void register(@ModelAttribute Utente utente) {
        utenteService.register(utente);
    }


    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword())
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        Utente utente = utenteRepository.findByEmail(loginRequest.getEmail());

        // Genera il token JWT
        String jwt = jwtUtil.generateToken(utente.getEmail());

        return ResponseEntity.ok(new AuthResponse(jwt, "Login effettuato con successo"));
    }

}
