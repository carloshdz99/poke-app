import { Component } from '@angular/core';
import { NavigationEnd, NavigationError, NavigationStart, Router, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LoadingComponent } from "./shared/components/loading/loading.component";
import { LoadingService } from './shared/services/loading.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    MatToolbarModule,
    RouterOutlet,
    LoadingComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'poke-app';

  constructor(
    private router: Router,
    private loadingService: LoadingService
  ) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.loadingService.showLoading();
      } else if (event instanceof NavigationEnd || event instanceof NavigationError) {
        setTimeout(()=> {
          this.loadingService.hideLoading()
        }, 2000)
      }
    })
  }
}
