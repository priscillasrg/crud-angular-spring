package com.priscilla.crudspring.repository;

import com.priscilla.crudspring.model.Course;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CourseRepository extends JpaRepository<Course, Long>{
    
}


// Repository declara como interface, e é possivel extender para o JPA no spring data