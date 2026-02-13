import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cross } from './cross';

describe('Cross', () => {
  let component: Cross;
  let fixture: ComponentFixture<Cross>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Cross]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Cross);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
