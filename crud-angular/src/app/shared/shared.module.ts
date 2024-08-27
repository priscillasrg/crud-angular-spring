import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppMaterialModule } from './app-material/app-material.module';
import { ErrorDialogComponent } from './components/error-dialog/error-dialog.component';
import { CategoryPipe } from './pipes/category.pipe';
import { NotFoundComponent } from './components/not-found/not-found.component';



@NgModule({
  declarations: [
    ErrorDialogComponent,
    CategoryPipe,
    NotFoundComponent,
  ],
  imports: [
    CommonModule,
    AppMaterialModule
  ],
  exports: [
    ErrorDialogComponent,
    CategoryPipe,
    NotFoundComponent,

  ]
})
export class SharedModule { }
