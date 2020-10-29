import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material/material.module';
import { DialogConfirmComponent } from './material/dialog-confirm/dialog-confirm.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [DialogConfirmComponent],
  exports: [
    MaterialModule,
    ReactiveFormsModule,
  ],
  providers: [],
})

export class SharedModule {
}
