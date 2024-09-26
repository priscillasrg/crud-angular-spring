package com.priscilla.crudspring.controller;

import java.util.List;

import com.priscilla.crudspring.model.Course;
import com.priscilla.crudspring.service.CourseService;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import org.springframework.web.bind.annotation.PutMapping;

@Validated
@RestController
@RequestMapping("/api/courses")


public class CourseController {

    private final CourseService courseService;

    public CourseController(CourseService courseService) {
        this.courseService = courseService;
    }

    @GetMapping
    public @ResponseBody List<Course> list() {
        return courseService.list();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Course> findById(@PathVariable @NotNull @Positive Long id) {
        return courseService.findById(id)
                .map(recordFound -> ResponseEntity.ok().body(recordFound))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    @ResponseStatus(code = HttpStatus.CREATED)
    public Course create(@RequestBody @Valid Course course) {
        return courseService.create(course);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Course> update(@PathVariable @NotNull @Positive Long id, @RequestBody @Valid Course course) {
        return courseService.update(id, course)
                .map(recordFound -> ResponseEntity.ok().body(recordFound))
                .orElse(ResponseEntity.notFound().build());
    }

    // Hard delete
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable @NotNull @Positive Long id) {
        if (courseService.delete(id)) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
        
    }

    // Soft delete
    // @PatchMapping("/{id}/soft-delete")
    // public ResponseEntity<Void> softDelete(@PathVariable @NotNull @Positive Long id) {
    //     return courseRepository.findById(id)
    //             .map(recordFound -> {
    //                 recordFound.setDeleted(true);
    //                 courseRepository.save(recordFound);
    //                 return ResponseEntity.noContent().<Void>build();
    //             })
    //             .orElse(ResponseEntity.notFound().build());
    // }

}
