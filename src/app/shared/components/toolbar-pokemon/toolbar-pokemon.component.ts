import { Component, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { CurrentUrl } from '../card-profile/card-profile.component';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { filter } from 'rxjs';

@Component({
  selector: 'app-toolbar-pokemon',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './toolbar-pokemon.component.html',
  styleUrl: './toolbar-pokemon.component.scss'
})
export class ToolbarPokemonComponent implements OnInit {
  currentUrl: CurrentUrl = CurrentUrl.profile
  name: string = 'Nombre'

  constructor(private activeRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.currentUrl = this.router.url.replace('/', '') as CurrentUrl
        if (localStorage.getItem('profile_data_name')) this.name = localStorage.getItem('profile_data_name') as string
      })
  }
}
