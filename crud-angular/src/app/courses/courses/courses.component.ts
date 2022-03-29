import { ErrorDialogComponent } from './../../shared/components/error-dialog/error-dialog.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Course } from '../model/course';
import { CoursesService } from '../services/courses.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

  displayedColumns = ['name', 'category'];
  courses$: Observable<Course[]>;


  constructor(private coursesService: CoursesService,
               public dialog: MatDialog) {

    this.courses$ = this.coursesService.list() 
    .pipe(
      catchError(error => {
       this.onError('Erro ao carregar cursos.');
        return of([])
      })
    )

  }

  ngOnInit(): void {
  }


  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg
    });
  }


}


  // Inicializar array com = [] ao invés de inserir no construtor
 
  // courses: Course[] = [{ _id: '1', name: 'Angular', category: 'front-end'}];

  // coursesService: CoursesService; 

  // this.courses = []  2a alternativa p/ inicializar array

  // this.coursesService = new CoursesService(); - instancia de classe (dentro do construtor)

  // this.courses = this.coursesService.list() - posso instanciar no construtor ou no onInit quando não estiver tipado

  // this.courses$ = this.coursesService.list() - forma que é declarada quando utilizado rxjs pipe first, não precisando do subscribe, 
  // ele consegue acessar direto por esta func. O simbolo $ é só a notação para dizer que é um observable boas praticas
  
  