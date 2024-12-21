import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardPokemonProfileComponent } from './card-pokemon-profile.component';

describe('CardPokemonProfileComponent', () => {
  let component: CardPokemonProfileComponent;
  let fixture: ComponentFixture<CardPokemonProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardPokemonProfileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardPokemonProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
