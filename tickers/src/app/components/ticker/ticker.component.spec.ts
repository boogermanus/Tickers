import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TickerComponent } from './ticker.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { TickerService } from '../../services/ticker.service';

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
    const fixture = TestBed.createComponent(TickerComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('#card-title')?.textContent).toContain('Tickers');
  });

  it('should have method reset()', () => {
    expect(component.reset).toBeDefined();
  });

  it('should call reset on service', () => {
    spyOn(service,'reset');

    component.reset();

    expect(service.reset).toHaveBeenCalled();
  })
});
