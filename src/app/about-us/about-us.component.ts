import { Component } from '@angular/core';
import { TrainersComponent } from "../trainers/trainers.component";
import { RouterModule } from '@angular/router';
import { TestimonialsComponent } from "../testimonials/testimonials.component";
import { ChooseUsComponent } from '../choose-us/choose-us.component';

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [TrainersComponent, RouterModule, TestimonialsComponent, ChooseUsComponent],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.css'
})
export class AboutUsComponent {

}
