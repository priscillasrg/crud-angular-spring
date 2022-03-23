import { Component, OnInit } from '@angular/core';
import { Course } from '../model/course';


import { CoursesService } from '../services/courses.service';


@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

  //Inicializar array com = [] ao invés de inserir no construtor
  courses: Course[] = [{ _id: '1', name: 'Angular', category: 'front-end'}];
  displayedColumns = ['name', 'category'];
  // coursesService: CoursesService;



  constructor(private coursesService: CoursesService) {
    // this.courses = []  2a alternativa p/ inicializar array
    // this.coursesService = new CoursesService(); - instancia de classe
    // this.courses = this.coursesService.list() - posso instanciar aqui ou no onInit
   }

  ngOnInit(): void {
    this.courses = this.coursesService.list()
  }



}
