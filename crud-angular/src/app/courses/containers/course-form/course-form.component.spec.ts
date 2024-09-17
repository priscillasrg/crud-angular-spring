import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CourseFormComponent } from './course-form.component';
import { CoursesService } from '../../services/courses.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { ReactiveFormsModule, Validators, NonNullableFormBuilder } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('CourseFormComponent', () => {
  let component: CourseFormComponent;
  let formBuilder: NonNullableFormBuilder
  let fixture: ComponentFixture<CourseFormComponent>;
  let coursesService: jest.Mocked<CoursesService>;
  let snackBar: jest.Mocked<MatSnackBar>;
  let location: jest.Mocked<Location>;

  beforeEach(async () => {
    const coursesServiceSpy = jest.fn().mockImplementation(() => ({
      saveCourse: jest.fn().mockReturnValue(of({}))
    }))() as jest.Mocked<CoursesService>;

    const snackBarSpy = jest.fn().mockImplementation(() => ({
      open: jest.fn()
    }))() as jest.Mocked<MatSnackBar>;

    const locationSpy = jest.fn().mockImplementation(() => ({
      back: jest.fn()
    }))() as jest.Mocked<Location>;

    const activatedRouteSpy = {
      snapshot: {
        data: {
          course: { id: '1', name: 'Test Course', category: 'Front end' }
        }
      }
    } as unknown as ActivatedRoute;

    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MatCardModule,
        MatInputModule,
        MatSelectModule,
        MatToolbarModule,
        BrowserAnimationsModule
      ],
      declarations: [CourseFormComponent],
      providers: [
        { provide: CoursesService, useValue: coursesServiceSpy },
        { provide: MatSnackBar, useValue: snackBarSpy },
        { provide: Location, useValue: locationSpy },
        { provide: ActivatedRoute, useValue: activatedRouteSpy }
      ]
    }).compileComponents();

    formBuilder = TestBed.inject(NonNullableFormBuilder);
    fixture = TestBed.createComponent(CourseFormComponent);
    component = fixture.componentInstance;
    coursesService = TestBed.inject(CoursesService) as jest.Mocked<CoursesService>;
    snackBar = TestBed.inject(MatSnackBar) as jest.Mocked<MatSnackBar>;
    location = TestBed.inject(Location) as jest.Mocked<Location>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with course data', () => {
    expect(component.form.value).toEqual({
      id: '1',
      name: 'Test Course',
      category: 'Front end'
    });
  });

  it('should call CoursesService saveCourse on valid form submission', () => {
    component.form.setValue({
      id: '1',
      name: 'Updated Course',
      category: 'Back end'
    });

    const mockCourse = {
      id: '1',
      name: 'Updated Course',
      category: 'Back end'
    };

    component.onSubmit();

    expect(coursesService.saveCourse).toHaveBeenCalledWith(mockCourse);
    expect(snackBar.open).toHaveBeenCalledWith('Course created successfully', '', { duration: 3000 });
    expect(location.back).toHaveBeenCalled();
  });

  it('should display error message on error', () => {
    const error = { message: 'Test error' };
    component.onError(error);
    expect(snackBar.open).toHaveBeenCalledWith('Error submitting form: Test error', '', { duration: 3000 });
  });

  it('should return name required error message', () => {
    component.form = formBuilder.group({
      id: [''],
      name: ['', Validators.required],
      category: ['']
    });
    const errorMessage = component.getFormControlError('name');
    expect(errorMessage).toBe('Name is required');
  });

  it('should return minlength error message', () => {
    component.form = formBuilder.group({
      id: [''],
      name: ['abc', Validators.minLength(5)],
      category: ['']
    });
    const errorMessage = component.getFormControlError('name');
    expect(errorMessage).toBe('Minimum 5 characters');
  });

  it('should return maxlength error message', () => {
    component.form = formBuilder.group({
      id: [''],
      name: ['a'.repeat(101), Validators.maxLength(100)],
      category: ['']
    });
    const errorMessage = component.getFormControlError('name');
    expect(errorMessage).toBe('Maximum 100 characters');
  });

  it('should return invalid field message for unknown error', () => {
    component.form = formBuilder.group({
      id: [''],
      name: ['abc', Validators.pattern(/^\d+$/)],
      category: ['']
    });
    const errorMessage = component.getFormControlError('name');
    expect(errorMessage).toBe('Invalid field');
  });
});