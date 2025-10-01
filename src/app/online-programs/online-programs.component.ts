import { Component } from '@angular/core';
import { TestimonialsComponent } from '../testimonials/testimonials.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-online-programs',
  standalone: true,
  imports: [TestimonialsComponent, RouterModule],
  templateUrl: './online-programs.component.html',
  styleUrl: './online-programs.component.css'
})
export class OnlineProgramsComponent {

}
