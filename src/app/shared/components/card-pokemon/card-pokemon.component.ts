import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { PokeService } from '../../services/poke.service';

@Component({
  selector: 'app-card-pokemon',
  standalone: true,
  imports: [
    MatCardModule
  ],
  templateUrl: './card-pokemon.component.html',
  styleUrl: './card-pokemon.component.scss'
})
export class CardPokemonComponent implements OnChanges {
  @Output() pokeSelectedEmmitt = new EventEmitter<string>();
  @Input() name?: string = ''
  @Input() bgClass?: string = ''
  id: number = 0
  url: string = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/id.png'

  constructor(
    private pokeService: PokeService
  ) {}

  async ngOnChanges(changes: SimpleChanges): Promise<void> {
    if (changes['name']) {
      const pokeData = await this.pokeService.getOne(changes['name'].currentValue)
      this.url = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokeData.id}.png`
      this.id = pokeData.id as number
    }
  }

  onSelected(name: string) {
    this.pokeSelectedEmmitt.emit(name)
  }

  fillWithZeros(id: number = 0): string {
    return id.toString().padStart(3, '0');
  }
}
