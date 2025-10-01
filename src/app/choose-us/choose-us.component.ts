import { NgFor, ViewportScroller } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-choose-us',
  standalone: true,
  imports: [NgFor],
  templateUrl: './choose-us.component.html',
  styleUrl: './choose-us.component.css'
})
export class ChooseUsComponent {

  constructor(private viewportScroller: ViewportScroller) {}

  scrollToTestimonials(): void {
    // Using ViewportScroller
    this.viewportScroller.scrollToAnchor('testimonials');
  }

    currentSlide = 0;
  slides = [
    {
      img: 'offline_wide.webp',
      alt: 'Barbells and Racks',
      caption: 'Best Personal Trainers'
    },
    {
      img: 'carousel2.webp',
      alt: 'Barbells and Racks',
      caption: 'Best Studio In Town'
    },
    {
      img: 'carousel3.webp',
      alt: 'Cardio Machines in Gym',
      caption: 'Iconic Locations'
    }
  ];

  prevSlide() {
    this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
  }

}
