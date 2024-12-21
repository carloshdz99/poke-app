import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Pokemon, PokemonList } from '../../models/pokemon-model';

@Injectable({
  providedIn: 'root'
})
export class PokeService {

  constructor(
    protected http: HttpClient,
  ) { }

  getAll(params: any = {}): Promise<PokemonList> {
    return lastValueFrom(this.http.get<PokemonList>('https://pokeapi.co/api/v2/pokemon?limit=151&offset=0'))
  }

  getOne(name: string): Promise<Pokemon> {
    return lastValueFrom(this.http.get<Pokemon>(`https://pokeapi.co/api/v2/pokemon/${name}`))
  }
}
