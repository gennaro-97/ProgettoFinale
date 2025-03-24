package com.example.backend.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.backend.models.Task;
import com.example.backend.services.TaskService;

import lombok.RequiredArgsConstructor;


@RestController
@RequestMapping("/tasks")
@RequiredArgsConstructor
public class TaskController {

    private final TaskService taskService;

    @GetMapping()
    public ResponseEntity<?> getAll(@RequestParam Long utenteId) {
        if (utenteId == null) {
            return ResponseEntity.badRequest().body("Il parametro 'utenteId' è obbligatorio.");
        }
        return ResponseEntity.ok(taskService.getTaskByUtenteId(utenteId));
    }

    @PostMapping()
    public ResponseEntity<String> saveTask(@RequestBody Task task) {
        taskService.saveTask(task);
        return ResponseEntity.status(HttpStatus.CREATED).body("Task creato con successo!");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteTask(@PathVariable Long id) {
        taskService.deleteTask(id);
        return ResponseEntity.ok("Task eliminato con successo!");
    }

    @PatchMapping("/{id}/resolved")
    public ResponseEntity<String> setTaskResolved(@PathVariable Long id, @RequestBody Boolean resolved) {
        taskService.setTaskResolved(id, resolved);
        return ResponseEntity.ok("Task aggiornato con successo!");
    }
}

