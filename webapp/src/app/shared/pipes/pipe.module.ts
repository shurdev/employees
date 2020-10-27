import { NgModule } from '@angular/core';
import { HttpTransformPipe } from './http-transform/http-transform.pipe';

@NgModule({
    declarations: [
      HttpTransformPipe
    ],
    exports: [
      HttpTransformPipe
    ],
  })
  export class PipeModule {}
