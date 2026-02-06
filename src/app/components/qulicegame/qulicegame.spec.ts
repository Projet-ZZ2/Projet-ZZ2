import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Qulicegame } from './qulicegame';

describe('Qulicegame', () => {
  let component: Qulicegame;
  let fixture: ComponentFixture<Qulicegame>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Qulicegame]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Qulicegame);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
