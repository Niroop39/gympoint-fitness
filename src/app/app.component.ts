import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { HeroComponent } from './hero/hero.component';
import { ProgramsComponent } from './programs/programs.component';
import { ChooseUsComponent } from "./choose-us/choose-us.component";
import { TrainersComponent } from './trainers/trainers.component';
import { TestimonialsComponent } from './testimonials/testimonials.component';
import { FooterComponent } from "./footer/footer.component";
import { HomeComponent } from "./home/home.component";
import { LoadingOverlayComponent } from './loading-overlay/loading-overlay.component';
import { Router } from '@angular/router';
import { LoadingService } from './loading.service';
import { filter } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ScrollTopComponent } from "./scroll-top/scroll-top.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    NavbarComponent,
    FooterComponent,
    LoadingOverlayComponent,
    ReactiveFormsModule, ScrollTopComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  constructor(
    private router: Router,
    private loadingService: LoadingService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.loadingService.show();
      } else if (
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError
      ) {
        // Add a slight delay to make the loading screen visible even for quick transitions
        setTimeout(() => {
          this.loadingService.hide();
        }, 500);
      }
    });

    if (isPlatformBrowser(this.platformId)) {
      this.router.events.pipe(
        filter(event => event instanceof NavigationEnd)
      ).subscribe(() => {
        window.scrollTo(0, 0);
      });
    }
  }
}
