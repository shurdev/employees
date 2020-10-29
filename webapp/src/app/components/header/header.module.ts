import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
    declarations: [
        HeaderComponent,
    ],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule,
    ],
    exports: [
        HeaderComponent,

    ],
    providers: [HeaderComponent],
})
export class HeaderModule { }
