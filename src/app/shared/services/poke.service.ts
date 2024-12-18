import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokeService {

  constructor(
    protected http: HttpClient,
  ) { }

  getAll(params: any): Promise<any> {
    return lastValueFrom(this.http.get<any>('https://pokeapi.co/api/v2/pokemon?limit=151&offset=0'))
  }
}
