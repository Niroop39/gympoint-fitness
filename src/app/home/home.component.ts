import { Component } from '@angular/core';
import { ProgramsComponent } from "../programs/programs.component";
import { ChooseUsComponent } from "../choose-us/choose-us.component";
import { TrainersComponent } from "../trainers/trainers.component";
import { TestimonialsComponent } from "../testimonials/testimonials.component";
import { HeroComponent } from '../hero/hero.component';
import { AboutTabComponent } from "../about-tab/about-tab.component";
import { LocationsComponent } from '../locations/locations.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProgramsComponent, ChooseUsComponent, TrainersComponent, TestimonialsComponent, HeroComponent, AboutTabComponent, LocationsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
