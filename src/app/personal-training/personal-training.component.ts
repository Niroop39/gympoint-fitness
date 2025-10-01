import { Component } from '@angular/core';
import { TestimonialsComponent } from "../testimonials/testimonials.component";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-personal-training',
  standalone: true,
  imports: [TestimonialsComponent, RouterModule],
  templateUrl: './personal-training.component.html',
  styleUrl: './personal-training.component.css'
})
export class PersonalTrainingComponent {

}
