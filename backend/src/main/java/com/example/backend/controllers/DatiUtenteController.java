package com.example.backend.controllers;

import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.models.DatiUtente;
import com.example.backend.services.DatiUtenteService;

import lombok.RequiredArgsConstructor;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/datiUtente")
@RequiredArgsConstructor
public class DatiUtenteController {

    private final DatiUtenteService datiUtenteService;


    @PostMapping()
    public ResponseEntity<String> saveDatiUtente(@RequestBody DatiUtente datiUtente) {
        datiUtenteService.saveDatiUtente(datiUtente);
        return ResponseEntity.status(HttpStatus.CREATED).body("Dati utente creati con successo!");
    }

    @PutMapping("/{utenteId}/aggiorna")
    public ResponseEntity<DatiUtente> aggiornaDatiUtente(
            @PathVariable Long utenteId,
            @RequestParam double peso,
            @RequestParam double altezza) {

        DatiUtente datiAggiornati = datiUtenteService.aggiornaDatiUtente(utenteId, peso, altezza);
        return ResponseEntity.ok(datiAggiornati);
    }


    @GetMapping("/{utenteId}")
    public ResponseEntity<Optional<DatiUtente>> getDatiUtente(@PathVariable(name = "utenteId") Long utenteId) {
        Optional<DatiUtente> datiUtente = datiUtenteService.getDatiUtente(utenteId);
        return ResponseEntity.ok(datiUtente);
    }

}
