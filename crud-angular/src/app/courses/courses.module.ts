import { CoursesListComponent } from './courses-list/courses-list.component';
import { NgModule } from '@angular/core';
import { CoursesComponent } from './courses/courses.component';
import { CoursesRoutingModule } from './courses-routing.module';
import { CommonModule } from '@angular/common';
import { AppMaterialModule } from './../shared/app-material/app-material.module';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CourseFormComponent } from './course-form/course-form.component';



@NgModule({
  declarations: [
    CoursesComponent,
    CourseFormComponent, 
    CoursesListComponent
  ],
  imports: [
    CommonModule,
    CoursesRoutingModule,
    AppMaterialModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class CoursesModule { }
