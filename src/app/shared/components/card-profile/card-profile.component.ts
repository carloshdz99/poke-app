import { NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';

export enum CurrentUrl {
  profile = "profile",
  pokemons = "pokemons",
  pokemonprofile = "pokemon-profile"
}

@Component({
  selector: 'app-card-profile',
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule,
    NgClass
  ],
  templateUrl: './card-profile.component.html',
  styleUrl: './card-profile.component.scss'
})
export class CardProfileComponent implements OnInit {
  imageUrl?: string
  profileImageBase64: string | null = null
  name?: string
  hobby?: string
  documentIdentification?: string
  documentType?: string
  age?: string

  currentUrl: CurrentUrl = CurrentUrl.profile

  constructor(private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.currentUrl = this.activeRoute.snapshot.url.join('/') as CurrentUrl
    if (localStorage.getItem('profileImage')) this.imageUrl = localStorage.getItem('profileImage') as string

    if (localStorage.getItem('profile_data_name')) this.name = localStorage.getItem('profile_data_name') as string

    if (localStorage.getItem('profile_data_age')) this.age = localStorage.getItem('profile_data_age') as string
    if (localStorage.getItem('profile_data_document')) this.documentIdentification = localStorage.getItem('profile_data_document') as string
    if (localStorage.getItem('profile_data_document_type')) this.documentType = localStorage.getItem('profile_data_document_type') as string
    if (localStorage.getItem('profile_data_hobby')) this.hobby = localStorage.getItem('profile_data_hobby') as string
  }

  onProfileImageSelected(e: Event) {
    if (this.imageUrl) {
      this.onRemoveImageSelected()
    } else {
      const input = e.target as HTMLInputElement;

      if (input.files && input.files[0]) {
        const file = input.files[0]
        const reader = new FileReader();

        reader.onload = () => {
          this.profileImageBase64 = reader.result as string
          localStorage.setItem('profileImage', this.profileImageBase64)
          this.imageUrl = this.profileImageBase64
        }

        reader.readAsDataURL(file)

      }
    }
  }

  onRemoveImageSelected() {
    localStorage.removeItem('profileImage')
    this.imageUrl = undefined
  }
}
