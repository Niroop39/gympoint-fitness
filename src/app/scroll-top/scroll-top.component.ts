import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, HostListener, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { Subject, throttleTime, takeUntil } from 'rxjs';

@Component({
  selector: 'app-scroll-top',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './scroll-top.component.html',
  styleUrl: './scroll-top.component.css'
})
export class ScrollTopComponent implements OnInit, OnDestroy {
  showScrollButton = false;
  private scrollThreshold = 400; // Show button after scrolling 400px
  private destroy$ = new Subject<void>();
  private scroll$ = new Subject<void>();

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Setup throttled scroll event handling
      this.scroll$.pipe(
        throttleTime(100), // Limit processing to once every 100ms
        takeUntil(this.destroy$)
      ).subscribe(() => {
        this.checkScrollPosition();
      });
      
      // Initial check
      this.checkScrollPosition();
    }
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.scroll$.next();
    }
  }

  scrollToTop(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Smooth scroll to top with native API
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }

  private checkScrollPosition(): void {
    // Show button when scrolled down past threshold
    this.showScrollButton = window.scrollY > this.scrollThreshold;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
