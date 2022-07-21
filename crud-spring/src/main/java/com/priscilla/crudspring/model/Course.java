package com.priscilla.crudspring.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;

// @Getter
// @Setter
@Data
@Entity
// @Table (name = "cursos")
public class Course {
    @Id    
    @GeneratedValue (strategy = GenerationType.AUTO)
    @JsonProperty("_id")
    private Long id;
    
    // @Column(name = "nome")
    @Column(length = 200, nullable = false)
    private String name;

    @Column(length = 10, nullable = false)
    private String category;
}


//Lombok criar automaticamente os gets, sets, construtores, toString
//Lombok pode escrever individual, ou @Data que já pegar vários
//Entity faz parte do pacote do JPA de persistência
// Hibernate vai criar automaticamente as tabelas de acordo com os nomes dados
//Generated value determina qual banco de dados vai ser gerada a tabela, o auto é para gerar automaticamente

// Se nao declarar @Column, como foi utilizado o entity, já fica implicito que é uma coluna, mas é legal add caso minhas propriedades tenham nome diferente da tabela, @Column(name = "nome")
// mas tb não é necessário preencher

