import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../shared/material/material.module';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from './http/http.module';
import { HeaderModule } from './components/header/header.module';
import { LoginModule } from './components/login/login.module';

@NgModule({
  imports: [
    MaterialModule,
    CommonModule,
    BrowserModule,
    HttpModule,
  ],
  declarations: [],
  exports: [
    HttpModule,
    HeaderModule,
    LoginModule,
  ],
  providers: []
})
export class CoreModule {
}
