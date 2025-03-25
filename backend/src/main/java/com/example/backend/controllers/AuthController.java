package com.example.backend.controllers;

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
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import lombok.RequiredArgsConstructor;

@Controller
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthenticationManager authenticationManager;
    private final UtenteService utenteService;
    private final JwtTokenProvider tokenProvider;

    @GetMapping("/{id}")
    public Utente getUtente(@PathVariable Long id) {
        return utenteService.getUtenteById(id);
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Utente utente) {
        try {
            utenteService.register(utente);
            return ResponseEntity.ok("Registrazione completata con successo!");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
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

            return ResponseEntity.ok(new AuthResponse(jwt, loginRequest.getUsername(), role));

        } catch (AuthenticationException e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

}
