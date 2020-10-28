import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from './http/http.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    BrowserModule,
    HttpModule,
  ],
  declarations: [],
  exports: [
    HttpModule,
  ],
  providers: []
})
export class CoreModule {
}
