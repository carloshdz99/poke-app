import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolbarPokemonComponent } from './toolbar-pokemon.component';

describe('ToolbarPokemonComponent', () => {
  let component: ToolbarPokemonComponent;
  let fixture: ComponentFixture<ToolbarPokemonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToolbarPokemonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ToolbarPokemonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
