import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';

import { Course } from '../model/course';
import { CoursesService } from '../services/courses.service';
import { inject } from '@angular/core';
import { of } from 'rxjs';

export const CourseResolver: ResolveFn<Course> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  if (route.params['id']) {
    // console.log(route.paramMap.get('id')!);
    return inject(CoursesService).findCourseById(route.paramMap.get('id')!);
  }
  return of({ id: '', name: '', category: '' });
};
