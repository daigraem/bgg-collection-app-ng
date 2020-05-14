import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderbyFilterComponent } from './orderby-filter.component';

describe('OrderbyFilterComponent', () => {
  let component: OrderbyFilterComponent;
  let fixture: ComponentFixture<OrderbyFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderbyFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderbyFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
