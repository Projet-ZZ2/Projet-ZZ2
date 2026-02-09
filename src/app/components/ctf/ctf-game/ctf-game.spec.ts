import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CtfGame } from './ctf-game';

describe('CtfGame', () => {
  let component: CtfGame;
  let fixture: ComponentFixture<CtfGame>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CtfGame]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CtfGame);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
