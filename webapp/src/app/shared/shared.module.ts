import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material/material.module';
import { HttpTransformPipe } from './pipes/http-transform.pipe';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    HttpTransformPipe
  ],
  exports: [
    MaterialModule,
    ReactiveFormsModule,
  ]
})

export class SharedModule {
}
