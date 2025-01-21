import { TestBed } from '@angular/core/testing';

import { TickerService } from './ticker.service';

describe('TickerService', () => {
  let service: TickerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TickerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have method start()', () => {
    expect(service.start).toBeDefined();
  });

  it('should set running to true when start() is called', () => {
    service.start();
    expect(service.Running()).toBeTrue();
  });

  it('should set done to false when start() is called', () => {
    service.start();
    expect(service.Done()).toBeFalse();
  });

  it('should have method config()', () => {
    expect(service.config).toBeDefined();
  });

  it('should set Ticks to 0 when config() is called with COUNT_UP', () => {
    service.config(1, TickerService.COUNT_UP);
    expect(service.Ticks()).toEqual(0);
  });

  it('should set Ticks to 1 when config() is called with COUNT_DOWN', () => {
    service.config(1, TickerService.COUNT_DOWN);
    expect(service.Ticks()).toEqual(1);
  });

  it('should have method stop()', () => {
    expect(service.stop).toBeDefined();
  });

  it('should set running to false when stop is called', () => {
    service.start();
    service.stop();
    expect(service.Running()).toBeFalse();
  })

  it('should call unsubscribe() when stop() is called', () => {
    let spy = spyOn<any>(service, 'unsubscribe');
    service.stop();
    expect(spy).toHaveBeenCalled();
  })
});
