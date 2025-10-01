import { Component, HostListener } from '@angular/core';
import { NgbCollapseModule, NgbDropdown, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap'
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgbCollapseModule, NgbDropdownModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
	isMenuCollapsed = true;
  isScrolled = false;

  // Listen to the window scroll event
  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    // Check if the page is scrolled
    this.isScrolled = window.scrollY > 0;
  }

}
