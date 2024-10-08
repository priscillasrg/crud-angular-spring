package com.priscilla.crudspring.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

import org.hibernate.validator.constraints.Length;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;

@Data
@Entity

public class Course {
    @Id    
    @GeneratedValue (strategy = GenerationType.AUTO)
    @JsonProperty("id")
    private Long id;
    
    @NotBlank
    @NotNull
    @Length(min = 5, max = 100 )
    @Column(length = 100, nullable = false)
    private String name;

    @NotBlank
    @NotNull
    @Length(max = 10 )
    @Pattern(regexp = "Back end|Front end")
    @Column(length = 10, nullable = false)
    private String category;

    private boolean deleted = false;
}


