import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'httpTransform'
})
export class HttpTransformPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
