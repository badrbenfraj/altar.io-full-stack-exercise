import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LiveComponent } from './live.component';
import { By } from '@angular/platform-browser';

describe('LiveComponent', () => {
  let component: LiveComponent;
  let fixture: ComponentFixture<LiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LiveComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(LiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display "LIVE" text', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.status-live').textContent).toContain('LIVE');
  });

  it('should display the code', () => {
    component.code = '1234';
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.code-display span').textContent).toContain('Your Code: 1234');
  });

  it('should have the live-dot element', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.live-dot')).toBeTruthy();
  });

  it('should apply "active" class to live-dot when generationStarted is true', () => {
    component.generationStarted = true;
    fixture.detectChanges();
    const liveDot = fixture.debugElement.query(By.css('.live-dot'));
    expect(liveDot.classes['active']).toBeTruthy();
  });

  it('should not apply "active" class to live-dot when generationStarted is false', () => {
    component.generationStarted = false;
    fixture.detectChanges();
    const liveDot = fixture.debugElement.query(By.css('.live-dot'));
    expect(liveDot.classes['active']).toBeFalsy();
  });
});
