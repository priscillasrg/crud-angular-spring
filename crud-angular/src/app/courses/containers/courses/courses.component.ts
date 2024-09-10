import { ErrorDialogComponent } from '../../../shared/components/error-dialog/error-dialog.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Course } from '../../model/course';
import { CoursesService } from '../../services/courses.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

  // public courses$: Observable<Course[]> = of([]);
  public courses$: Observable<Course[]> | null = null;


  constructor(private coursesService: CoursesService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
  ) {
    this.refresh();
  }

  ngOnInit(): void {
  }


  public refresh() {
    this.loadCourses();
  }

  // private listCourses(): Observable<Course[]> {
  //   return this.courses$;
  // }

  private loadCourses() {
    this.courses$ = this.coursesService.listCourses().pipe(
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
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: 'Are you sure you want delete this course? ',
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.coursesService.deleteCourse(course.id).subscribe(
          () => {
            this.refresh();
            this.snackBar.open('Course deleted successfully', 'X', {
              duration: 3000,
              verticalPosition: 'top',
              horizontalPosition: 'center'
            });
          },
          (error) => {
            this.handleError('Error to delete course')
          }
        )        
      }
    });
  }

  private handleError(errorMsg: string, error?: any): void {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg
    });
  }

}

