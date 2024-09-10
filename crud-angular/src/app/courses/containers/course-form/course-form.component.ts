import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { CoursesService } from '../../services/courses.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Course } from '../../model/course';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent implements OnInit {

  form = this.formBuilder.group({
    id: [''],
    name: ['', [
      Validators.required, 
      Validators.minLength(5),
      Validators.maxLength(100)
    ]],
    category: ['', [Validators.required]]
  });

  constructor(private formBuilder: NonNullableFormBuilder,
    private coursesService: CoursesService,
    private snackBar: MatSnackBar,
    private location: Location,
    private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    const course: Course = this.route.snapshot.data['course'];
    this.form.setValue({
      id: course.id,
      name: course.name,
      category: course.category,
    })
  }


  public onSubmit() {
    if (this.form.valid) {
      this.coursesService.saveCourse(this.form.value).subscribe(
        data => this.onSuccess(),
        error => {
          console.error('Error submitting form:', error);
          this.onError(error);
        }
      );
    } else {
      this.snackBar.open('Please fill out the form correctly.', '', {
        duration: 3000
      });
    }
  }

  public onCancel() {
    this.location.back();
  }

  private onSuccess() {
    this.snackBar.open('Course created successfully', '', {
      duration: 3000
    });
    this.onCancel();
  }

  private onError(error: any) {
    this.snackBar.open(`Error submitting form: ${error.message}`, '', {
      duration: 3000
    });
  }

  public getFormControlError(fieldName: string) {
    const field = this.form.get(fieldName);
    const capitalizedFieldName = fieldName.charAt(0).toUpperCase() + fieldName.slice(1);

    if (field?.hasError('required')) {
      return `${capitalizedFieldName} is required`;
    }

    if (field?.hasError('minlength')) {
      const requiredLength = field.errors ? field.errors['minlength']['requiredLength']: 5;
      return `Minimum ${requiredLength} characters`;
    }


    if (field?.hasError('maxlength')) {
      const requiredLength = field.errors ? field.errors['maxlength']['requiredLength'] : 100;
      return `Maximum ${requiredLength} characters`;
    }

    return 'Invalid field'
  }

}
