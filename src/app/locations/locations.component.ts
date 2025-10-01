import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';



interface Gym {
  branch: string; // Only the branch/location name
  address: string;
  contact: string;
  hours: string;
  photos: string[];
  mapUrl: string;
}

@Component({
  selector: 'app-locations',
  standalone: true,
  imports: [NgFor, CommonModule],
  templateUrl: './locations.component.html',
  styleUrl: './locations.component.css'
})
export class LocationsComponent {

  brandName = 'GymPoint Fitness Studio';
  gyms: Gym[] = [
    {
      branch: 'Madhapur-Hitech',
      address: 'Plot 12, Hitech City Rd, Madhapur, Hyderabad',
      contact: '+91 8008884655',
      hours: '6am - 10pm',
      photos: [
        'carousel1.jpg',
        'carousel2.jpg'
      ],
      mapUrl: 'https://goo.gl/maps/abc123madhapur'
    },
    {
      branch: 'Karmanghat',
      address: 'Plot 22, Karmanghat Main Rd, Hyderabad',
      contact: '+91 8008884655',
      hours: '6am - 10pm',
      photos: [
      ],
      mapUrl: 'https://goo.gl/maps/abc123karmanghat'
    },
    {
      branch: 'Tellapur',
      address: 'Plot 33, Tellapur Main Rd, Hyderabad',
      contact: '+91 8008884655',
      hours: '6am - 10pm',
      photos: [
      ],
      mapUrl: 'https://goo.gl/maps/abc123tellapur'
    },
    {
      branch: 'Uppal',
      address: 'Plot 44, Uppal Main Rd, Hyderabad',
      contact: '+91 8008884655',
      hours: '6am - 10pm',
      photos: [
      ],
      mapUrl: 'https://goo.gl/maps/abc123uppal'
    },
    {
      branch: 'Malakpet',
      address: 'Plot 55, Malakpet Main Rd, Hyderabad',
      contact: '+91 8008884655',
      hours: '6am - 10pm',
      photos: [
      ],
      mapUrl: 'https://goo.gl/maps/abc123malakpet'
    },
    {
      branch: 'Chandanagar',
      address: 'Plot 66, Chandanagar Main Rd, Hyderabad',
      contact: '+91 8008884655',
      hours: '6am - 10pm',
      photos: [
      ],
      mapUrl: 'https://goo.gl/maps/abc123chandanagar'
    }
  ];



  selectedGym: Gym | null = this.gyms[0];

  selectGym(gym: Gym) {
    this.selectedGym = gym;
  }
}