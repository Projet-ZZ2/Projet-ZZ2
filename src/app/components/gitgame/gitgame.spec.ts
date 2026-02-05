import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Gitgame } from './gitgame';

describe('Gitgame', () => {
  let component: Gitgame;
  let fixture: ComponentFixture<Gitgame>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Gitgame]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Gitgame);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
