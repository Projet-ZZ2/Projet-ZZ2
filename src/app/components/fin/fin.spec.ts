import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Fin } from './fin';

describe('Fin', () => {
  let component: Fin;
  let fixture: ComponentFixture<Fin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Fin]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Fin);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
