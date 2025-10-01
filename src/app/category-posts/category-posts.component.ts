import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { WordpressService } from '../wordpress.service';
import { Title } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { CategorySectionComponent } from "../category-section/category-section.component";

@Component({
  selector: 'app-category-posts',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    CategorySectionComponent
],
  templateUrl: './category-posts.component.html',
  styleUrls: ['./category-posts.component.css']
})
export class CategoryPostsComponent implements OnInit {
  categoryId: number = 0;
  categoryName: string = '';
  categoryDescription: string = '';
  posts: any[] = [];
  loading: boolean = true;
  currentPage: number = 1;
  totalPages: number = 0;
  totalPosts: number = 0;
  categories: any[] = [];
  isBrowser: any;

  constructor(
    private route: ActivatedRoute,
    private wordpressService: WordpressService,
    private titleService: Title,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.categoryId = +params['id'];
      this.loadCategoryDetails();
      this.loadPosts();
      this.loadCategories();
    });
  }

  loadCategoryDetails(): void {
    this.wordpressService.getCategories().subscribe(
      categories => {
        const category = categories.find((cat: any) => cat.id === this.categoryId);
        if (category) {
          this.categoryName = category.name;
          this.categoryDescription = category.description || `Explore our collection of articles in the ${category.name} category.`;
          this.titleService.setTitle(`${category.name} - Articles`);
        }
      }
    );
  }

  loadPosts(): void {
    this.loading = true;
    this.wordpressService.getPostsByCategory(this.categoryId, 6, this.currentPage).subscribe(
      response => {
        this.posts = response.posts;
        this.totalPages = response.totalPages;
        this.totalPosts = response.totalPosts;
        this.loading = false;
      },
      error => {
        console.error('Error loading posts:', error);
        this.loading = false;
      }
    );
  }

  loadCategories(): void {
    this.wordpressService.getCategories().subscribe(
      categories => {
        this.categories = categories;
      }
    );
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadPosts();
      window.scrollTo(0, 0);
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadPosts();
      window.scrollTo(0, 0);
    }
  }

  // Utility methods
  stripHtml(html: string): string {
    if (!html) return '';
    
    if (this.isBrowser) {
      const tmp = document.createElement('DIV');
      tmp.innerHTML = html;
      return tmp.textContent || tmp.innerText || '';
    } else {
      // Server-side alternative
      return html.replace(/<[^>]*>/g, '');
    }
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  }

  getReadingTime(content: string): string {
    const strippedContent = this.stripHtml(content);
    const words = strippedContent.split(/\s+/).length;
    const wordsPerMinute = 200;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min read`;
  }

  extractFeaturedImage(content: string): string {
    const imgRegex = /<img[^>]+src="([^">]+)"/;
    const match = imgRegex.exec(content);
    
    if (match && match[1]) {
      return `<img src="${match[1]}" class="img-fluid" alt="Featured image">`;
    }
    
    // Default image if no image found in content
    return '<img src="assets/images/default-blog-image.jpg" class="img-fluid" alt="Default featured image">';
  }

  getCategoryName(categoryId: number): string {
    const category = this.categories.find(cat => cat.id === categoryId);
    return category ? category.name : '';
  }
}