package com.example.backend.controllers;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import com.example.backend.models.Utente;
import com.example.backend.responses.AuthResponse;
import com.example.backend.responses.AuthRequest;
import com.example.backend.security.JwtTokenProvider;
import com.example.backend.services.UtenteService;

import org.springframework.security.core.AuthenticationException;

import lombok.RequiredArgsConstructor;

@Controller
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:4200")
@RequiredArgsConstructor
public class AuthController {
    private final AuthenticationManager authenticationManager;
    private final UtenteService utenteService;
    private final JwtTokenProvider tokenProvider;

    @GetMapping("/{id}")
    public Utente getUtente(@PathVariable(name="id") Long id) {
        return utenteService.getUtenteById(id);
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Utente utente) {
        try {
            utenteService.register(utente);
            return ResponseEntity.ok(Map.of("message", "Registrazione completata con successo!"));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody AuthRequest loginRequest) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginRequest.getUsername(),
                            loginRequest.getPassword()));

            SecurityContextHolder.getContext().setAuthentication(authentication);
            String jwt = tokenProvider.generateToken(authentication);

            String role = authentication.getAuthorities().stream()
                    .findFirst()
                    .map(authority -> authority.getAuthority())
                    .orElse("ROLE_UNKNOWN");

            Long idUtente = utenteService.findByUsername(loginRequest.getUsername()).getId();

            return ResponseEntity.ok(new AuthResponse(jwt, loginRequest.getUsername(), role, idUtente));

        } catch (AuthenticationException e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

}
