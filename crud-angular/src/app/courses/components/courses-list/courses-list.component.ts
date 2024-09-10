import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Course } from '../../model/course';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrl: './courses-list.component.scss'
})

export class CoursesListComponent implements OnInit {

  @Input() courses: Course[] = [];
  @Output() addNewCourseView = new EventEmitter<boolean>(false);
  @Output() editCourseView = new EventEmitter<Course>();
  @Output() deleteCourseView = new EventEmitter<Course>();



  readonly displayedColumns = ['name', 'category', 'actions'];

  constructor() { }

  ngOnInit(): void {
  }

  public navigateToNewAddCourse() {
    this.addNewCourseView.emit(true);
  }

  public editCourse(course: Course) {
    this.editCourseView.emit(course);
  }

  public deleteCourse(course: Course) {
    this.deleteCourseView.emit(course);
  }

}
