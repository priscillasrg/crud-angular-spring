import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay, first, tap } from 'rxjs/operators';

import { Course } from '../model/course';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  // private readonly API = '/assets/courses.json';
  private readonly API = 'api/courses';

  
  constructor(private httpClient: HttpClient) { }


  
  getCourses() {
    return this.httpClient.get<Course[]>(this.API)
    .pipe(
      first(),
      delay(1000),
      tap(courses => console.log(courses))
    );
  }

  createNewCourse(course: Partial<Course>): Observable<Course> {
    return this.httpClient.post<Course>(this.API, course)
      .pipe(
        first(),
      );
  }


}
