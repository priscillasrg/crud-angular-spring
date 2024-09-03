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


  public listCourses() {
    return this.httpClient.get<Course[]>(this.API)
      .pipe(
        first(),
        // delay(1000),
        // tap(courses => console.log(courses))
      );
  }

  public findCourseById(id: string) {
    return this.httpClient.get<Course>(`${this.API}/${id}`);
  }

  public saveCourse(course: Partial<Course>) {
    if (course.id) {      
      return this.updateCourse(course)
    }
    return this.createNewCourse(course)
  }

  private createNewCourse(course: Partial<Course>): Observable<Course> {
    return this.httpClient.post<Course>(this.API, course)
      .pipe(
        first(),
      );
  }

  private updateCourse(course: Partial<Course>) {
    return this.httpClient.put<Course>(`${this.API}/${course.id}`, course)
      .pipe(
        first(),
      );
  }

  public deleteCourse(id: string) {
    return this.httpClient.delete(`${this.API}/${id}`)
      .pipe(
        first()
      );
  }

}
