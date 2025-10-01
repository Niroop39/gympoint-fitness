import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-programs',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule

  ],
  templateUrl: './programs.component.html',
  styleUrl: './programs.component.css'
})
export class ProgramsComponent {
  programs = [
    {
      title: 'Weight Management',
      image: 'assets/images/program1.webp',
      description: 'Personalized plans to help you achieve and maintain your ideal weight through balanced nutrition and targeted exercises.',
      link: '#'
    },
    {
      title: 'Strength Training',
      image: 'assets/images/program2.webp',
      description: 'Build muscle, increase bone density, and enhance overall functionality with our specialized strength training programs.',
      link: '#'
    },
    {
      title: 'Mental Wellness',
      image: 'assets/images/program3.webp',
      description: 'Focus on mindfulness, stress reduction, and emotional balance to achieve complete mental well-being.',
      link: '#'
    },
    {
      title: 'Nutrition Coaching',
      image: 'assets/images/program4.webp',
      description: 'Expert guidance on creating sustainable eating habits that fuel your body and support your fitness objectives.',
      link: '#'
    }
  ];
}
