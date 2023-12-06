import { classNames } from './classNames';

describe('classNames', () => {
  it('should return a string of class names', () => {
    const className = classNames('test', 'test2');
    expect(className).toEqual('test test2');
  });
});
