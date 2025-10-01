import { Component, OnInit } from '@angular/core';
import { LoadingService } from '../loading.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading-overlay',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loading-overlay.component.html',
  styleUrl: './loading-overlay.component.css'
})
export class LoadingOverlayComponent implements OnInit {
  isLoading = false;

  constructor(private loadingService: LoadingService) { }

  ngOnInit() {
    this.loadingService.loading$.subscribe(isLoading => {
      this.isLoading = isLoading;
    });
  }
}
