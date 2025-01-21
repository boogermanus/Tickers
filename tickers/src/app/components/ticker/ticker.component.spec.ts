import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TickerComponent } from './ticker.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { TickerService } from '../../services/ticker.service';
import { By } from '@angular/platform-browser';

describe('TickerComponent', () => {
  let component: TickerComponent;
  let fixture: ComponentFixture<TickerComponent>;
  let service: TickerService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TickerComponent,
        NoopAnimationsModule
      ],
      providers: [TickerService]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TickerComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(TickerService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have element card-title', () => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.query(By.css('#card-title'));
    expect(compiled.nativeElement?.textContent).toContain('Tickers');
  });

  it('should have method reset()', () => {
    expect(component.reset).toBeDefined();
  });

  it('should call reset on service', () => {
    spyOn(service,'reset');

    component.reset();

    expect(service.reset).toHaveBeenCalled();
  });

  it('should set ticks to service ticks', () => {
    component.ticks = 10;
    component.reset();
    expect(component.ticks).toEqual(service.Ticks());
  });

  it('should set mode to service mode', () => {
    component.mode = 'U'
    component.reset();
    expect(component.mode).toEqual(TickerService.COUNT_DOWN);
  });

  it('should call reset when the reset button is clicked', () => {
    spyOn(component, 'reset');
    const button = fixture.debugElement.query(By.css('#resetButton'));
    button.triggerEventHandler('click', null);

    expect(component.reset).toHaveBeenCalled();
  });

  it('should have method start', () => {
    expect(component.start).toBeDefined();
  });

  it('should call reset on start with correct arguments', () => {
    component.ticks = 10;
    component.mode = TickerService.COUNT_DOWN;

    spyOn(service, "reset");

    component.start();
    expect(service.reset).toHaveBeenCalledWith(component.ticks, component.mode);
  });

  it('should call start on start', () => {
    spyOn(service, "start");
    component.start();
    expect(service.start).toHaveBeenCalled();
  });

  it('should call start when the start button is clicked', () => {
    spyOn(component, 'start');
    const button = fixture.debugElement.query(By.css('#startButton'));
    button.triggerEventHandler('click', null);

    expect(component.start).toHaveBeenCalled();
  });

  it('should have method stop', () => {
    expect(component.stop).toBeDefined();
  });

  it('should call stop on the service when stop is called', () => {
    spyOn(service, 'stop');
    component.stop();
    expect(service.stop).toHaveBeenCalled();
  });

  it('should call stop when the stop button is clicked', () => {
    spyOn(component, 'stop');
    const button = fixture.debugElement.query(By.css('#stopButton'));
    button.triggerEventHandler('click', null);

    expect(component.stop).toHaveBeenCalled();
  });

  it('should disable stop button',() => {
    const button = fixture.debugElement.query(By.css('#stopButton'));
    expect(button.nativeElement.disabled).toBeTrue();
  });

  it('should enable stop button on start', () => {
    component.start();
    expect(component.stopButtonDisabled).toBeFalse();
  });

  it('should enable start button',() => {
    const button = fixture.debugElement.query(By.css('#startButton'));
    expect(button.nativeElement.disabled).toBeFalse();
  }); 
  
  it('should disable start button on start', () => {
    component.start();
    expect(component.startButtonDisabled).toBeTrue();
  });
});
