import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { AsyncPipe, NgClass } from '@angular/common';
import { DateAdapter, MAT_DATE_LOCALE, provideNativeDateAdapter } from '@angular/material/core';
import { CustomDateAdapter } from '../shared/CustomDateAdapter';
import { GreetingComponent } from "../shared/components/greeting/greeting.component";
import { CardProfileComponent } from "../shared/components/card-profile/card-profile.component";
import { Router } from '@angular/router';
import dayjs from 'dayjs';

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
    CardProfileComponent,
    FormsModule,
    NgClass
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
  @ViewChild('pokeProfileForm') formRef: NgForm | undefined;
  imageUrl: string = '../assets/user_24px.png'

  myControl = new FormControl('');
  options: string[] = ['Jugar Fútbol', 'Jugar Basquetball', 'Jugar Tennis', 'Jugar Voleibol', 'Jugar Fifa', 'Jugar Videojuegos'];
  filteredOptions: Observable<string[]> | undefined;

  ofAge: boolean = false;
  isDocumentValid: boolean = true;

  // form values
  name: string = ''
  documentIdentification: string = ''
  birthDay = new FormControl<Date | null>(null);
  hobby: string = ''

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );

    if (localStorage.getItem('profile_data_name')) this.name = localStorage.getItem('profile_data_name') as string
    if (localStorage.getItem('profile_data_document')) this.documentIdentification = localStorage.getItem('profile_data_document') as string
    if (localStorage.getItem('profile_data_birthday')) {
      this.birthDay.setValue(dayjs(localStorage.getItem('profile_data_birthday')).toDate())
    }

    if (localStorage.getItem('profile_data_hobby')) {
      this.myControl.setValue(localStorage.getItem('profile_data_hobby'))
    }
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  onWriteDUI() {
    if (this.ofAge) {
      this.documentIdentification = this.documentIdentification.replace(/\D/g, '');

      if (this.documentIdentification.length > 8) {
        this.documentIdentification = `${this.documentIdentification.slice(0, 8)}-${this.documentIdentification.slice(8, 9)}`;

        this.isDocumentValid = this.isDUI(this.documentIdentification);
      }
    }
  }

  isDUI(str: string) {
    const regex = /(^\d{8})-(\d$)/,
      parts = str.match(regex);
    if (parts !== null) {
      const digits = parts[1]
      const dig_ve = parseInt(parts[2], 10)
      let sum = 0;
      for (let i = 0, l = digits.length; i < l; i++) {
        const d = parseInt(digits[i], 10);
        sum += (9 - i) * d;
      }
      return dig_ve === (10 - (sum % 10)) % 10;
    } else {
      return false;
    }
  };

  onSelectedBirthDay() {
    const now = dayjs()

    if (dayjs(this.birthDay.value).isValid()) {
      const diff = now.diff(dayjs(this.birthDay.value), 'year')
      if (diff >= 18) {
        this.ofAge = true
        this.documentIdentification = ''
      } else {
        this.ofAge = false
      }
    }
  }

  async onContinue() {
    try {
      if (!this.isDocumentValid) {
        alert('Numero de Documento o DUI invalido')
        return;
      }

      if (this.formRef && !this.isFormValid(this.formRef.form)) {
        alert('Uno o mas campos estan incorrectos')
        return;
      }

      // saving data in local storage
      const now = dayjs()
      localStorage.setItem('profile_data_age', `${now.diff(dayjs(this.birthDay.value), 'year')} años`)
      localStorage.setItem('profile_data_birthday', dayjs(this.birthDay.value).toISOString())
      localStorage.setItem('profile_data_name', this.name)
      localStorage.setItem('profile_data_document_type', this.ofAge ? 'DUI' : 'Documento')
      localStorage.setItem('profile_data_document', this.documentIdentification)

      if (this.hobby) {
        localStorage.setItem('profile_data_hobby', this.hobby)
      }

      await this.router.navigate(['/pokemons'])
    } catch (e) {
      console.log(e);
    }
  }

  onSelectedHobby(event: any) {
    this.hobby = event.option.value
  }

  private isFormValid(form: FormGroup): boolean {
    if (form.invalid) {
      Object.keys(form.controls).forEach(k => {
        form.controls[k].markAsDirty();
        form.controls[k].markAsTouched();
        form.controls[k].updateValueAndValidity();
      });
    }
    return form.valid;
  }
}
