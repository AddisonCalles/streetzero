import 'jest-canvas-mock';
import 'jest';
import { Health } from '../src/health.class';

describe('Unit Tests Health Class', () => {
  test('General Flow and events', () => {
    let onDeadEvent = jest.fn();
    let onReduceEvent = jest.fn();
    let health = new Health(100);
    health.deadEvent.subscribe(onDeadEvent);
    health.reduceEvent.subscribe(onReduceEvent);
    expect(health.current).toBe(100);
    expect(health.total).toBe(100);
    health.reduce(50);
    expect(health.isDead).toBeFalsy();
    expect(health.current).toBe(50);
    health.reduce(50);
    expect(health.isDead).toBeTruthy();
    expect(health.current).toBe(0);
    expect(onDeadEvent).nthCalledWith(1, health);
    expect(onReduceEvent).nthCalledWith(2, health);
  });
  test('Test negative life', () => {
    let health = new Health(100);
    expect(health.current).toBe(100);
    expect(health.total).toBe(100);
    health.reduce(120);
    expect(health.isDead).toBeTruthy();
    expect(health.current).toBe(0);
  });
  test('Test increment life with Health.reduce', () => {
    let health = new Health(100);
    expect(health.current).toBe(100);
    expect(health.total).toBe(100);
    health.reduce(-120);
    expect(health.isDead).toBeFalsy();
    expect(health.current).toBe(100);
  });
  test('Test reset life', () => {
    let health = new Health(100);
    expect(health.current).toBe(100);
    expect(health.total).toBe(100);
    health.reduce(100);
    expect(health.isDead).toBeTruthy();
    expect(health.current).toBe(0);
    health.reset();
    expect(health.isDead).toBeFalsy();
    expect(health.current).toBe(100);
  });
});
