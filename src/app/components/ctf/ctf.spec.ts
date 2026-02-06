import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ctf } from './ctf';

describe('Ctf', () => {
  let component: Ctf;
  let fixture: ComponentFixture<Ctf>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Ctf]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Ctf);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
