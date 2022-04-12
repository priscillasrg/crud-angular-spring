package com.priscilla.crudspring.controller;

import java.util.List;

import com.priscilla.crudspring.model.Course;
import com.priscilla.crudspring.repository.CourseRepository;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping ("/api/courses")
@AllArgsConstructor
// @Component
public class CourseController {
    
    // @Autowired
    private final CourseRepository courseRepository;


    // public CourseController(CourseRepository courseRepository) {
    //     this.courseRepository = courseRepository;
    // }

    // @RequestMapping(method = RequestMethod.GET)
    @GetMapping
    public List<Course> list() {
        return courseRepository.findAll();
    }


}



// RestController indica pro spring que essa classe tem endpoint, tem uma url para acessar api, seria um java servelet 
// ResquestMapping que fala exatamente qual sera a url da api
// Metodo get tem 2 formas de passar através do  @GetMapping ou @RequestMapping(method = RequestMethod.GET), fica a preferência
// @Componente no spring cria uma instancia  e gerencia o ciclo de vida desse componente
// Injeção via controler -  Autowired serve para criar constructor, get/sets, mas nao é tão utilizado mais e sim o constructor através do source action generate construc.
// Pelo lombok @AllArgsConstructor serve para criar constructor automaticamente, outra opcao
// private final - boa prática, se o atributo não modifica, a instancia não é alterada, pode usar o termo "final"
