import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Espace3d } from './espace3d';

describe('Espace3d', () => {
  let component: Espace3d;
  let fixture: ComponentFixture<Espace3d>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Espace3d]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Espace3d);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
