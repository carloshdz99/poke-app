import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-card-profile',
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule
  ],
  templateUrl: './card-profile.component.html',
  styleUrl: './card-profile.component.scss'
})
export class CardProfileComponent {
  imageUrl: string = '../assets/user_24px.png'
}
