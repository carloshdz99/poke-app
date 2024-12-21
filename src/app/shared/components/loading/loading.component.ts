import { Component } from '@angular/core';
import { filter, Observable } from 'rxjs';
import { LoadingService } from '../../services/loading.service';
import { AsyncPipe, NgIf } from '@angular/common';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { CurrentUrl } from '../card-profile/card-profile.component';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [
    NgIf,
    AsyncPipe
  ],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.scss'
})
export class LoadingComponent {
  isLoading: Observable<boolean>;
  currentUrl: CurrentUrl = CurrentUrl.profile

  constructor(private loadingService: LoadingService, private activeRoute: ActivatedRoute, private router: Router) {
    this.isLoading = this.loadingService.loading$

    console.log(this.activeRoute.snapshot.url.join('/'));

    this.router.events.pipe(filter(event => event instanceof NavigationStart))
          .subscribe(() => {
            this.currentUrl = this.router.url.replace('/', '') as CurrentUrl
          })
    
  }
}
