package com.example.backend.controllers;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.backend.models.Task;
import com.example.backend.services.TaskService;

import lombok.RequiredArgsConstructor;


@RestController
@RequestMapping("/api/tasks")
@CrossOrigin(origins = "http://localhost:4200")
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

    @PostMapping
    public ResponseEntity<Task> createTask(@RequestBody Task task) {
        try {
            Task newTask = taskService.createTask(task);
            return new ResponseEntity<>(newTask, HttpStatus.CREATED);
        } catch (Exception e) {
            // Se c'è un errore, come ad esempio un problema con i dati della task
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteTask(@PathVariable Long id) {
        taskService.deleteTask(id);
        return ResponseEntity.ok("Task eliminato con successo!");
    }

    @PutMapping("/{id}/resolve")
    public ResponseEntity<String> setTaskResolved(@PathVariable Long id, @RequestParam boolean resolved) {
        taskService.setTaskResolved(id, resolved);
        return ResponseEntity.ok("Task " + id + " aggiornata con stato: " + resolved);
    }

    @GetMapping("/resolved")
    public List<Task> getResolvedTasks(@RequestParam Long utenteId) {
        return taskService.getResolvedTasksByUtenteId(utenteId);
    }

    @GetMapping("/unresolved")
    public List<Task> getUnresolvedTasks(@RequestParam Long utenteId) {
        return taskService.getUnresolvedTasksByUtenteId(utenteId);
    }
}

