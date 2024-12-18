import { Component } from '@angular/core';

@Component({
  selector: 'app-card-pokemon',
  standalone: true,
  imports: [],
  templateUrl: './card-pokemon.component.html',
  styleUrl: './card-pokemon.component.scss'
})
export class CardPokemonComponent {
  url: string = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/id.png'
}
