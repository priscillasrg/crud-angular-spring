import { ErrorDialogComponent } from './../../shared/components/error-dialog/error-dialog.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Course } from '../model/course';
import { CoursesService } from '../services/courses.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

  courses$: Observable<Course[]>;


  constructor(private coursesService: CoursesService,
              public dialog: MatDialog,
              private router: Router,
              private route: ActivatedRoute) {

    this.courses$ = this.coursesService.getCourses() 
    .pipe(
      catchError(error => {
       this.onError('Error to load courses');
        return of([])
      })
  )}

  ngOnInit(): void {
}
  

  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg
    });
  }

  onAddCourse() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }


}

