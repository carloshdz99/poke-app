import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { AsyncPipe } from '@angular/common';
import { DateAdapter, MAT_DATE_LOCALE, provideNativeDateAdapter } from '@angular/material/core';
import { CustomDateAdapter } from '../shared/CustomDateAdapter';
import { GreetingComponent } from "../shared/components/greeting/greeting.component";
import { CardProfileComponent } from "../shared/components/card-profile/card-profile.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    AsyncPipe,
    MatDatepickerModule,
    GreetingComponent,
    CardProfileComponent
  ],
  providers: [
    provideNativeDateAdapter(),
    { provide: DateAdapter, useClass: CustomDateAdapter },
    { provide: MAT_DATE_LOCALE, useValue: 'es-Es' }
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  imageUrl: string = '../assets/user_24px.png'

  myControl = new FormControl('');
  options: string[] = ['Jugar Fútbol', 'Jugar Basquetball', 'Jugar Tennis', 'Jugar Voleibol', 'Jugar Fifa', 'Jugar Videojuegos'];
  filteredOptions: Observable<string[]> | undefined;

  constructor(
    private router: Router
  ) {}

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  async onContinue() {
    await this.router.navigate(['/pokemons'])
  }
}
