import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { InputDebounceComponent } from './input-debounce.component';

describe('InputDebounceComponent', () => {
  let component: InputDebounceComponent;
  let fixture: ComponentFixture<InputDebounceComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ InputDebounceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputDebounceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
