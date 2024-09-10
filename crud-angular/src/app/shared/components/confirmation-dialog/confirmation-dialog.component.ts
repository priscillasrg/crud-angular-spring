import { Component, inject, model } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { AppMaterialModule } from '../../app-material/app-material.module';


@Component({
  selector: 'app-confirmation-dialog',
  standalone: true,
  imports: [AppMaterialModule],
  templateUrl: './confirmation-dialog.component.html',
  styleUrl: './confirmation-dialog.component.scss'
})
export class ConfirmationDialogComponent {

  public dialogRef = inject(MatDialogRef<ConfirmationDialogComponent>);
  public data = inject<any>(MAT_DIALOG_DATA);


  constructor() {

  }

  onConfirm(result: boolean): void {
    this.dialogRef.close(result);
  }

}
