import { ViewportScroller } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-choose-us',
  standalone: true,
  imports: [],
  templateUrl: './choose-us.component.html',
  styleUrl: './choose-us.component.css'
})
export class ChooseUsComponent {

  constructor(private viewportScroller: ViewportScroller) {}

  scrollToTestimonials(): void {
    // Using ViewportScroller
    this.viewportScroller.scrollToAnchor('testimonials');
  }

}
