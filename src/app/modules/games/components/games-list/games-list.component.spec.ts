import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameGamesComponent } from './games-list.component';

describe('GameGamesComponent', () => {
  let component: GameGamesComponent;
  let fixture: ComponentFixture<GameGamesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameGamesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameGamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
