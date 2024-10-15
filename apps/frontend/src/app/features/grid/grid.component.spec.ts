import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GridComponent } from './grid.component';
import { GridService } from '@app/core/services/grid.service';
import { of, throwError, Subject } from 'rxjs';
import { startGridGeneration } from '@helpers/utils';
import { By } from '@angular/platform-browser';
import { SharedModule } from '@app/shared/shared.module';

jest.mock('@helpers/utils', () => ({
  startGridGeneration: jest.fn()
}));

describe('GridComponent', () => {
  let component: GridComponent;
  let fixture: ComponentFixture<GridComponent>;
  let gridServiceMock: Partial<GridService>;
  let destroy$: Subject<boolean>;

  beforeEach(async () => {
    gridServiceMock = {
      getGrid: jest.fn(),
      getSecretCode: jest.fn()
    };

    await TestBed.configureTestingModule({
      imports: [SharedModule],
      providers: [{ provide: GridService, useValue: gridServiceMock }]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GridComponent);
    component = fixture.componentInstance;
    destroy$ = new Subject<boolean>();
    component['destroy$'] = destroy$;
    fixture.detectChanges();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should generate grid and code when generateGrid is called', () => {
    const mockGrid = [
      ['a', 'b'],
      ['c', 'd']
    ];
    const mockCode = 'abcd';
    (startGridGeneration as jest.Mock).mockReturnValue(of({ grid: mockGrid, code: mockCode }));

    component.character = 'a';
    component.generateGrid();

    expect(startGridGeneration).toHaveBeenCalledWith(gridServiceMock, expect.any(Function));
    expect(component.grid).toEqual(mockGrid);
    expect(component.code).toEqual(mockCode);
    expect(component.generationStarted).toBe(true);
    expect(component.inputDisabled).toBe(true);
  });

  it('should handle error when generateGrid is called', () => {
    (startGridGeneration as jest.Mock).mockReturnValue(throwError('error'));

    component.character = 'a';
    component.generateGrid();

    expect(startGridGeneration).toHaveBeenCalledWith(gridServiceMock, expect.any(Function));
    expect(component.generationStarted).toBe(false);
    expect(component.inputDisabled).toBe(true);
  });

  it('should not generate grid if generation is already started', () => {
    component.generationStarted = true;
    component.generateGrid();

    expect(startGridGeneration).not.toHaveBeenCalled();
  });

  it('should disable input if character length is 1', () => {
    const disableInputSpy = jest.spyOn(component, 'disableInput');
    component.character = 'a';
    component.generateGrid();

    expect(disableInputSpy).toHaveBeenCalled();
  });

  it('should not disable input if character length is not 1', () => {
    const disableInputSpy = jest.spyOn(component, 'disableInput');
    component.character = 'ab';
    component.generateGrid();

    expect(disableInputSpy).not.toHaveBeenCalled();
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
