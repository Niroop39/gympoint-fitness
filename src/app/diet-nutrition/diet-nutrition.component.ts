import { Component } from '@angular/core';
import { TestimonialsComponent } from "../testimonials/testimonials.component";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-diet-nutrition',
  standalone: true,
  imports: [TestimonialsComponent, RouterModule],
  templateUrl: './diet-nutrition.component.html',
  styleUrl: './diet-nutrition.component.css'
})
export class DietNutritionComponent {

}
