import { ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Observable, of } from 'rxjs';
import { GridComponent } from './grid.component';
import { GridService } from '@services/grid.service';
import { SharedModule } from '@app/shared/shared.module';

describe('GridComponent', () => {
  let component: GridComponent;
  let fixture: ComponentFixture<GridComponent>;
  let gridServiceMock: {
    getGrid: jest.Mock<Observable<string[][]>, [string]>;
    getSecretCode: jest.Mock<Observable<string>, [string[][]]>;
  };

  beforeEach(async () => {
    gridServiceMock = {
      getGrid: jest.fn().mockReturnValue(
        of([
          ['a', 'b'],
          ['c', 'd']
        ])
      ),
      getSecretCode: jest.fn().mockReturnValue(of('12'))
    };

    await TestBed.configureTestingModule({
      imports: [SharedModule],
      providers: [{ provide: GridService, useValue: gridServiceMock }]
    }).compileComponents();

    fixture = TestBed.createComponent(GridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should generate grid and code when generateGrid is called', fakeAsync(() => {
    component.character = 'a';
    component.generateGrid();

    tick(1000);
    fixture.detectChanges();
    // Ensure the gridService methods were called
    expect(gridServiceMock.getGrid).toHaveBeenCalled();
    expect(gridServiceMock.getSecretCode).toHaveBeenCalledWith([
      ['a', 'b'],
      ['c', 'd']
    ]);

    // Ensure the component's grid and code are updated
    expect(component.grid).toEqual([
      ['a', 'b'],
      ['c', 'd']
    ]);
    expect(component.code).toEqual('12');
    // complete the observable and clear timers then ensure there are no pending timers
    fixture.destroy();
    flush();
  }));

  it('should disable input when character length is 1', () => {
    component.character = 'a';
    component.generateGrid();
    fixture.detectChanges();

    expect(component.inputDisabled).toBeTruthy();
  });

  it('should allow only alphabets and delete keys in input', () => {
    const inputElement = fixture.debugElement.query(By.css('#characterInput')).nativeElement;

    const event = new KeyboardEvent('keydown', { key: 'a' });
    inputElement.dispatchEvent(event);
    fixture.detectChanges();

    expect(component.alphabetsOnly(event)).toBeTruthy();

    const deleteEvent = new KeyboardEvent('keydown', { key: 'Backspace' });
    inputElement.dispatchEvent(deleteEvent);
    fixture.detectChanges();

    expect(component.alphabetsOnly(deleteEvent)).toBeTruthy();

    const numberEvent = new KeyboardEvent('keydown', { key: '1' });
    inputElement.dispatchEvent(numberEvent);
    fixture.detectChanges();

    expect(component.alphabetsOnly(numberEvent)).toBeFalsy();
  });

  it('should disable input for 4 seconds when disableInput is called', (done) => {
    component.disableInput();
    expect(component.inputDisabled).toBeTruthy();

    setTimeout(() => {
      expect(component.inputDisabled).toBeFalsy();
      done();
    }, 4000);
  });

  it('should render grid cells correctly', () => {
    component.grid = [
      ['a', 'b'],
      ['c', 'd']
    ];
    fixture.detectChanges();

    const cells = fixture.debugElement.queryAll(By.css('.cell'));
    expect(cells.length).toBe(4);
    expect(cells[0].nativeElement.textContent).toBe('a');
    expect(cells[1].nativeElement.textContent).toBe('b');
    expect(cells[2].nativeElement.textContent).toBe('c');
    expect(cells[3].nativeElement.textContent).toBe('d');
  });

  it('should render empty grid when grid is empty', () => {
    component.grid = [];
    fixture.detectChanges();

    const cells = fixture.debugElement.queryAll(By.css('.cell'));
    expect(cells.length).toBe(100); // 10x10 grid
  });
});
