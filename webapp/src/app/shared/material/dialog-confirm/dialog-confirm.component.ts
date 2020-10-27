import { Component, Inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-confirm',
  templateUrl: './dialog-confirm.component.html',
  styleUrls: ['./dialog-confirm.component.scss'],
  // providers: [MatButtonModule]
})
export class DialogConfirmComponent {

  constructor(
    public dialogo: MatDialogRef<DialogConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public message: string) { }

    closeDialog(): void {
      this.dialogo.close(false);
    }
    confirm(): void {
      this.dialogo.close(true);
    }

}