import { Component } from '@angular/core';
import { TestimonialsComponent } from '../testimonials/testimonials.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-one-one-coach',
  standalone: true,
  imports: [TestimonialsComponent, RouterModule],
  templateUrl: './one-one-coach.component.html',
  styleUrl: './one-one-coach.component.css'
})
export class OneOneCoachComponent {

}
