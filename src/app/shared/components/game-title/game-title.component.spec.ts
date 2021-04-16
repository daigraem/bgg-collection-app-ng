import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { GameTitleComponent } from './game-title.component';

describe('GameTitleComponent', () => {
  let component: GameTitleComponent;
  let fixture: ComponentFixture<GameTitleComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [GameTitleComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(GameTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
