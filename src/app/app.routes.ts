import { Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { PokemonsComponent } from './pokemons/pokemons.component';
import { PokemonProfileComponent } from './pokemon-profile/pokemon-profile.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'profile',
        pathMatch: 'full'
    },
    {
        path: 'profile',
        component: ProfileComponent
    },
    {
        path: 'pokemons',
        component: PokemonsComponent
    },
    {
        path: 'pokemon-profile',
        component: PokemonProfileComponent
    }
];
