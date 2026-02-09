import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DifferencesGame } from './differences';

describe('DifferencesGame', () => {
  let component: DifferencesGame;
  let fixture: ComponentFixture<DifferencesGame>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DifferencesGame]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DifferencesGame);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
