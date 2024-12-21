import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { GreetingComponent } from "../shared/components/greeting/greeting.component";
import { CardProfileComponent } from "../shared/components/card-profile/card-profile.component";
import { PokeService } from '../shared/services/poke.service';
import { Pokemon, PokemonList } from '../models/pokemon-model';
import { CardPokemonComponent } from "../shared/components/card-pokemon/card-pokemon.component";
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { register } from 'swiper/element/bundle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { NgClass } from '@angular/common';

register();

@Component({
  selector: 'app-pokemons',
  standalone: true,
  imports: [GreetingComponent, CardProfileComponent, CardPokemonComponent, MatButtonModule, MatFormFieldModule, ReactiveFormsModule, MatIconModule, MatInputModule, NgClass],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './pokemons.component.html',
  styleUrl: './pokemons.component.scss'
})
export class PokemonsComponent implements OnInit {
  pokemonsList: PokemonList = { count: 0, results: [] }
  pokemons: Pokemon[] = []
  pokemonsListofList: Pokemon[][] = [[]]
  pokemonsSelected: string[] = []
  private typingTimer: any;

  constructor(
    private pokeService: PokeService,
    private router: Router
  ) { }

  async ngOnInit(): Promise<void> {
    try {
      this.pokemons = (await this.pokeService.getAll()).results

      this.pokemonsListofList = this.pokemonGroups(this.pokemons)
    } catch (e) {
      console.log(e);
    }
  }

  pokemonGroups(pokemons: Pokemon[]): Pokemon[][] {
    const pokemonList = [];
    for (let i = 0; i < pokemons.length; i += 9) {
      pokemonList.push(pokemons.slice(i, i + 9))
    }

    return pokemonList
  }

  onSelectedPokemon(name: string) {
    if (this.pokemonsSelected.includes(name)) {
      this.pokemonsSelected = this.pokemonsSelected.filter((i) => i !== name)
    } else {
      if (this.pokemonsSelected.length === 3) this.pokemonsSelected.pop()
      this.pokemonsSelected.push(name)
    }
  }

  bgSelectedPokemon(name: string): string {
    if (this.pokemonsSelected.includes(name)) {
      return 'bg-yellow'
    } else {
      if (this.pokemonsSelected.length === 3) {
        return 'bg-white pokemon-opacity'
      } else {
        return 'bg-white'
      }
    }
  }

  onSearchPokemon(event: Event): void {
    const input = (event.target as HTMLInputElement).value

    let isTyping: boolean = true

    if (isTyping) {
      clearTimeout(this.typingTimer)
    }

    this.typingTimer = setTimeout(async () => {
      isTyping = false;
      if (input.trim()) {
        if (!Number.isNaN(parseFloat(input))) {
          console.log(input);

          console.log('es numero');
          const pokemon = await this.pokeService.getOne(input)
          this.pokemonsListofList = this.pokemonGroups([pokemon])
        } else {
          const pokesFound = this.pokemons.filter((x) => x.name?.includes(input))
          this.pokemonsListofList = this.pokemonGroups(pokesFound)
        }
      } else {
        this.pokemons = (await this.pokeService.getAll()).results

        this.pokemonsListofList = this.pokemonGroups(this.pokemons)
      }
    }, 1500);
  }

  async onContinue() {
    try {
      localStorage.setItem('profile_data_poke_selected', this.pokemonsSelected.toString())

      await this.router.navigate(['/pokemon-profile'])
    } catch (e) {
      alert(e)
    }
  }
}
