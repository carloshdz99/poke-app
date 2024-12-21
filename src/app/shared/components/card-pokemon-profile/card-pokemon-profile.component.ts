import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { PokeService } from '../../services/poke.service';
import { Pokemon } from '../../../models/pokemon-model';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-card-pokemon-profile',
  standalone: true,
  imports: [
    MatCardModule,
    MatProgressBarModule,
    NgClass
  ],
  templateUrl: './card-pokemon-profile.component.html',
  styleUrl: './card-pokemon-profile.component.scss'
})
export class CardPokemonProfileComponent implements OnChanges {
  @Input() pokeId: string = ''
  imageUrl: string = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/1.png';

  pokemon: Pokemon = {}

  constructor(
    protected pokeService: PokeService
  ) { }

  async ngOnChanges(changes: SimpleChanges): Promise<void> {
    if (changes['pokeId']) {
      this.pokemon = await this.pokeService.getOne(changes['pokeId'].currentValue)
      this.imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${this.pokemon.id}.png`
    } else {
      this.pokemon = await this.pokeService.getOne('charmander')
      this.imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${this.pokemon.id}.png`
    }
  }

  getAbilities(abilities: any[] = []): string {
    const abilitiesName = abilities.map((i) => (i.type?.name || ''))
    return abilitiesName.join('/')
  }

  getPokemonTypeColor(): string {
    const pokemonType = (this.pokemon.types || [])[0].type

    if (pokemonType) {
      switch (pokemonType.name) {
        case 'normal':
          return 'pokemon-normal'
        case 'poison':
          return 'pokemon-poison'
        case 'water':
          return 'pokemon-water'
        case 'grass':
          return 'pokemon-grass'
        case 'electric':
          return 'pokemon-electric'
        case 'fire':
          return 'pokemon-fire'
        case 'bug':
          return 'pokemon-bug'
        case 'ground':
          return 'pokemon-ground'
        case 'fairy':
          return 'pokemon-fairy'
        case 'flying':
          return 'pokemon-flyer'
        case 'fighting':
          return 'pokemon-fighter'
        case 'rock':
          return 'pokemon-rock'
        case 'psychic':
          return 'pokemon-psychic'
      }
    }

    return 'pokemon-normal'
  }

  getPercetangeStat(stat: string, base_stat: number) {
    let widthValue: number = 0
    switch (stat) {
      case 'hp':
        widthValue = Math.round((base_stat / 255) * 100)
        break;
      case 'attack':
        widthValue = Math.round((base_stat / 190) * 100)
        break;
      case 'defense':
        widthValue = Math.round((base_stat / 230) * 100)
        break;
      case 'special-attack':
        widthValue = Math.round((base_stat / 194) * 100)
        break;
      case 'special-defense':
        widthValue = Math.round((base_stat / 230) * 100)
        break;
      case 'speed':
        widthValue = Math.round((base_stat / 180) * 100)
        break;
    }

    return widthValue;
  }
}
