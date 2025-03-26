package com.example.backend.services;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.backend.models.Task;
import com.example.backend.repositories.TaskRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TaskService {

    private final TaskRepository taskRepository;
    
    public List<Task> getTaskByUtenteId(Long utenteId){
        return taskRepository.findByUtenteId(utenteId);
    }

     // Metodo per creare una nuova task
     public Task createTask(Task task) {
        return taskRepository.save(task);
    }

    @Transactional
    public void deleteTask(Long id){
        if(!taskRepository.existsById(id)){
            throw new RuntimeException("Task " + id + " non tovata");
        }
        taskRepository.deleteById(id);
    }

    @Transactional
    public void setTaskResolved(Long id, boolean resolved) {
        Optional<Task> taskOptional = taskRepository.findById(id);
        if (!taskOptional.isPresent()) {
            throw new RuntimeException("Task " + id + " non trovata");
        }
        Task task = taskOptional.get();
        task.setRisolta(resolved);
        taskRepository.save(task);
    }

    public List<Task> getResolvedTasksByUtenteId(Long utenteId) {
        return taskRepository.findByUtenteIdAndRisoltaTrue(utenteId);
    }

    public List<Task> getUnresolvedTasksByUtenteId(Long utenteId) {
        return taskRepository.findByUtenteIdAndRisoltaFalse(utenteId);
    }

}
