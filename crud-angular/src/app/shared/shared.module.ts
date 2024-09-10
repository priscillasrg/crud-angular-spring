import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppMaterialModule } from './app-material/app-material.module';
import { ErrorDialogComponent } from './components/error-dialog/error-dialog.component';
import { CategoryPipe } from './pipes/category.pipe';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';



@NgModule({
  declarations: [
    ErrorDialogComponent,
    CategoryPipe,
    NotFoundComponent,    
  ],
  imports: [
    CommonModule,
    AppMaterialModule,
    ConfirmationDialogComponent
  ],
  exports: [
    ErrorDialogComponent,
    CategoryPipe,
    NotFoundComponent,
  ]
})
export class SharedModule { }
