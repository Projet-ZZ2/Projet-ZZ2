import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClickerGame } from './clicker-game';

describe('ClickerGame', () => {
  let component: ClickerGame;
  let fixture: ComponentFixture<ClickerGame>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClickerGame]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClickerGame);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
