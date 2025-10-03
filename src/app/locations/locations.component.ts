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
      address: 'Behind Meridian School, Siddhi Vinayak Nagar Madhapur, HITEC City, Hyderabad, Telangana 500081',
      contact: '+91 8008884655',
      hours: '6am - 10pm',
      photos: [
        'carousel1.webp'
      ],
      mapUrl: 'https://goo.gl/maps/abc123madhapur'
    },
    {
      branch: 'Karmanghat',
      address: '8-4-23, Karmanghat Rd, opp. Green Park Colony Main Road, opp. UNLIMITED, Pavanpuri Colony, KAMAN, Hyderabad, Telangana 500074',
      contact: '+91 8008884655',
      hours: '6am - 10pm',
      photos: [
        'carousel2.webp'
      ],
      mapUrl: 'https://goo.gl/maps/abc123karmanghat'
    },
    {
      branch: 'Tellapur',
      address: '4th and 5th Floor, Tellapur Rd, opposite MUPPA\'S GREEN GRANDEUR, Gopanapalli Thanda, Hyderabad, Telangana 500046',
      contact: '+91 8008884655',
      hours: '6am - 10pm',
      photos: [
        'carousel3.webp'
      ],
      mapUrl: 'https://goo.gl/maps/abc123tellapur'
    },
    {
      branch: 'Uppal',
      address: '01, Plot No. A, 1/5, Survey no, IDA Uppal, Uppal, Hyderabad, Telangana 500039',
      contact: '+91 8008884655',
      hours: '6am - 10pm',
      photos: [
        'carousel4.webp'
      ],
      mapUrl: 'https://goo.gl/maps/abc123uppal'
    }
  ];



  selectedGym: Gym | null = this.gyms[0];

  selectGym(gym: Gym) {
    this.selectedGym = gym;
  }
}