import { ErrorDialogComponent } from '../../../shared/components/error-dialog/error-dialog.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Course } from '../../model/course';
import { CoursesService } from '../../services/courses.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

  public courses$: Observable<Course[]> = of([]);

  constructor(private coursesService: CoursesService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.loadCourses();
  }

  private getCourses(): Observable<Course[]> {
    return this.courses$;
  }

  private loadCourses() {
    this.courses$ = this.coursesService.getCourses().pipe(
      catchError(error => {
        this.handleError('Error loading courses', error);
        return of([]);
      })
    );
  }

  public navigateToNewAddCourse() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }


  public editCourseView(course: Course) {
    this.router.navigate(['edit', course.id], { relativeTo: this.route });

  }

  public deleteCourseView(course: Course) {
    // this.router.navigate(['delete'], { relativeTo: this.route });
  }



  private handleError(errorMsg: string, error?: any): void {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg
    });
  }

}

