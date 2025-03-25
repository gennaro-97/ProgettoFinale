package com.example.backend.controllers;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.backend.models.Task;
import com.example.backend.services.TaskService;

import lombok.RequiredArgsConstructor;


@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/tasks")
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

