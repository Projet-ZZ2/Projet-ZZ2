import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepHeader } from './step-header';

describe('StepHeader', () => {
  let component: StepHeader;
  let fixture: ComponentFixture<StepHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StepHeader],
    }).compileComponents();

    fixture = TestBed.createComponent(StepHeader);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
