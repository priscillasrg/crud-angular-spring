import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay, first, tap } from 'rxjs/operators';

import { Course } from '../model/course';
@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  private readonly API = '/assets/courses.json';

  constructor(private httpClient: HttpClient) { }

  // 1 EXEMPLO
  // list(): Course[] {
  //    // return [
  //   //   { _id: '1', name: 'Angular', category: 'front-end' }
  //   // ];
  // }
  
  list() {
    return this.httpClient.get<Course[]>(this.API)
    .pipe(
      first(),
      delay(5000),
      tap(courses => console.log(courses))
    );
  }

}

// operador first() - assim que vier do servidor a primeira resposta, ele já faz o subscribe automaticamente sem precisar fazer isso no TS
// delay - serve como timeout
// pipe ajuda a manipular antes de mandar pro servidor 
// tap - rxjs operator 
// take(1) - mesma função do first