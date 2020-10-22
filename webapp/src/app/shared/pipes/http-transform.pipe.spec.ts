import { HttpTransformPipe } from './http-transform.pipe';

describe('HttpTransformPipe', () => {
  it('create an instance', () => {
    const pipe = new HttpTransformPipe();
    expect(pipe).toBeTruthy();
  });
});
