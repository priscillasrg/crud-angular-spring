package com.priscilla.crudspring.controller;

import java.util.List;

import com.priscilla.crudspring.model.Course;
import com.priscilla.crudspring.repository.CourseRepository;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping ("/api/courses")
@AllArgsConstructor

public class CourseController {
    
    private final CourseRepository courseRepository;

    @GetMapping
    public @ResponseBody List<Course> list() {
        return courseRepository.findAll();
    }

    @PostMapping
    @ResponseStatus (code = HttpStatus.CREATED)
        public Course create(@RequestBody Course course) {
        return courseRepository.save(course);  
    }

}


