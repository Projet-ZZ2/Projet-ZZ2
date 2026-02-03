import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Computer } from './computer';

describe('Computer', () => {
  let component: Computer;
  let fixture: ComponentFixture<Computer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Computer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Computer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
