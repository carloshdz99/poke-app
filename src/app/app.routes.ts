import { Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { PokemonsComponent } from './pokemons/pokemons.component';

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
    }
];
