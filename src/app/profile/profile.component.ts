import { Component } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon'

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  imageUrl: string = '../assets/user_24px.png'
}
