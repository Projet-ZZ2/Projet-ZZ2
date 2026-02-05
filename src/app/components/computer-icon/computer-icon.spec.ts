import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComputerIcon } from './computer-icon';

describe('ComputerIcon', () => {
  let component: ComputerIcon;
  let fixture: ComponentFixture<ComputerIcon>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComputerIcon]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComputerIcon);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
