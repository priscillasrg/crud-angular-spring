package com.priscilla.crudspring.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping ("/api/hello")
public class HelloController {
    
    @GetMapping
    // @RequestMapping(method = {RequestMethod.GET}, produces = )
    public String hello() {
        return "Hello, World";
    }

}
