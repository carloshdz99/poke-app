import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-greeting',
  standalone: true,
  imports: [
    MatIconModule
  ],
  templateUrl: './greeting.component.html',
  styleUrl: './greeting.component.scss'
})
export class GreetingComponent {
  @Input() classListGreetings: string = ''
  @Input() h2Title?: string;
  @Input() h3Title?: string;
  @Input() icon?: string;
  @Input() text?: string;
}
