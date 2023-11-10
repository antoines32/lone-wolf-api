import { TransformObjectMiddleware } from './transform-object.middleware';

describe('TransformObjectMiddleware', () => {
  it('should be defined', () => {
    expect(new TransformObjectMiddleware()).toBeDefined();
  });
});
