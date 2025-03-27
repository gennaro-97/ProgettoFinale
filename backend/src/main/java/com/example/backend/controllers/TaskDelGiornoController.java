package com.example.backend.controllers;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.backend.models.TaskDelGiorno;
import com.example.backend.services.TaskDelGiornoService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/tasksdelgiorno")
@CrossOrigin(origins = "http://localhost:4200")
@RequiredArgsConstructor
public class TaskDelGiornoController {

    private final TaskDelGiornoService taskDelGiornoService;

    @GetMapping
    public List<TaskDelGiorno> getAllTasksDelGiorno() {
        return taskDelGiornoService.getAllTasksDelGiorno();
    }
    
    @GetMapping("/by-date")
    public ResponseEntity<List<TaskDelGiorno>> getTasksDelGiornoByDate(@RequestBody LocalDateTime data) {
        List<TaskDelGiorno> tasks = taskDelGiornoService.getTasksDelGiornoByDate(data);
        return ResponseEntity.ok(tasks);
    }
}
