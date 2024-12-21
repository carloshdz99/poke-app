import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { GreetingComponent } from "../shared/components/greeting/greeting.component";
import { CardProfileComponent } from "../shared/components/card-profile/card-profile.component";
import { CardPokemonProfileComponent } from "../shared/components/card-pokemon-profile/card-pokemon-profile.component";
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pokemon-profile',
  standalone: true,
  imports: [GreetingComponent, CardProfileComponent, CardPokemonProfileComponent, ScrollingModule, MatButtonModule, MatIconModule],
  // changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './pokemon-profile.component.html',
  styleUrl: './pokemon-profile.component.scss'
})
export class PokemonProfileComponent implements OnInit {
  pokemonList: string[] = []

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    const pokes = localStorage.getItem('profile_data_poke_selected')
    if (pokes) this.pokemonList = pokes.split(',')
  }

  async onEditPokemons() {
    await this.router.navigate(['/pokemons'])
  }

  async onEditProfile() {
    await this.router.navigate(['/profile'])
  }
}
