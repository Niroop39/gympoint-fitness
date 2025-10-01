import { Component, NgModule, OnInit } from '@angular/core';
import { WordpressService } from '../wordpress.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category-section',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule
  ],
  templateUrl: './category-section.component.html',
  styleUrl: './category-section.component.css'
})
export class CategorySectionComponent implements OnInit{
  categories: any[] = [];

  constructor(private wordpressService: WordpressService) {}
  ngOnInit(): void {
    this.loadCategories()
    console.log(this.categories)
  }



  loadCategories(): void {
    this.wordpressService.getCategories().subscribe(
      categories => {
        this.categories = categories;
      }
    );
  }
}
