package com.example.backend.services;

import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.example.backend.models.TaskDelGiorno;
import com.example.backend.repositories.TaskDelGiornoRepository;

import jakarta.transaction.Transactional;

@Service
@RequiredArgsConstructor
public class TaskDelGiornoService {
    private final TaskDelGiornoRepository taskDelGiornoRepository;

    public List<TaskDelGiorno> getAllTasksDelGiorno(){
        return taskDelGiornoRepository.findAll();
    }

    public List<TaskDelGiorno> getTasksDelGiornoByDate(LocalDateTime data){
        return taskDelGiornoRepository.findByGiornoDellaTask(data);
    }

    @Transactional
    public void addTaskDelGiorno(TaskDelGiorno taskDelGiorno){
        taskDelGiornoRepository.save(taskDelGiorno);
    }
    
    @Transactional
    public void deleteTaskDelGiornoById(Long id){
        taskDelGiornoRepository.deleteById(id);
    }
    
}