import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientGame } from './client-game';

describe('ClientGame', () => {
  let component: ClientGame;
  let fixture: ComponentFixture<ClientGame>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientGame]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientGame);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
