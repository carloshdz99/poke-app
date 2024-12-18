import { Component } from '@angular/core';
import { GreetingComponent } from "../shared/components/greeting/greeting.component";
import { CardProfileComponent } from "../shared/components/card-profile/card-profile.component";

@Component({
  selector: 'app-pokemons',
  standalone: true,
  imports: [GreetingComponent, CardProfileComponent],
  templateUrl: './pokemons.component.html',
  styleUrl: './pokemons.component.scss'
})
export class PokemonsComponent {

}
