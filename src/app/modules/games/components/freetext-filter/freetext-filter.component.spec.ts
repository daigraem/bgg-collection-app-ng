import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FreetextFilterComponent } from './freetext-filter.component';

describe('FreetextFilterComponent', () => {
  let component: FreetextFilterComponent;
  let fixture: ComponentFixture<FreetextFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FreetextFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FreetextFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
