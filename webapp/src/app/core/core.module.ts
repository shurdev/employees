import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from './http/http.module';
import { HeaderModule } from './components/header/header.module';
import { LoginModule } from './components/login/login.module';
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
    HeaderModule,
    LoginModule,
  ],
  providers: []
})
export class CoreModule {
}
