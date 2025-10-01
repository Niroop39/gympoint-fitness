import { Component, OnInit, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { WordpressService } from '../wordpress.service';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { LoadingOverlayComponent } from '../loading-overlay/loading-overlay.component';
import { LoadingService } from '../loading.service';
import { CategorySectionComponent } from '../category-section/category-section.component';

@Component({
  selector: 'app-blogs',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    CategorySectionComponent
  ],
  templateUrl: './blogs.component.html',
  styleUrl: './blogs.component.css'
})
export class BlogsComponent implements OnInit {
  searchInput: string = ''; // For the input field
  searchTerm: string = ''; // For tracking current search
  loading: boolean = true;
  posts: any[] = [];
  categories: any[] = [];
  tags: any[] = [];
  
  // Pagination properties
  currentPage: number = 1;
  totalPages: number = 1;
  postsPerPage: number = 6; // Changed to 6 posts per page
  
  constructor(
    private wordpresService: WordpressService,
    private loadingOverlay: LoadingService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    this.loading = true; // Set loading state for initial load
    this.loadInitialData();
  }
  
  loadInitialData(): void {
    // Load categories and tags first
    forkJoin({
      categories: this.wordpresService.getCategories(),
      tags: this.wordpresService.getTags()
    }).subscribe({
      next: (results) => {
        this.categories = results.categories;
        this.tags = results.tags;
        
        // Now load posts with pagination
        this.loadPostsInitial();
      },
      error: (error) => {
        console.error('Error fetching categories and tags:', error);
        this.loading = false;
      }
    });
  }

  // This method is for the initial load and uses the component's loading flag
  loadPostsInitial(): void {
    this.wordpresService.getPosts(this.postsPerPage, this.currentPage)
      .subscribe({
        next: (response) => {
          this.posts = response.posts;
          this.totalPages = response.totalPages;
          this.loading = false; // Turn off component loading state
        },
        error: (error) => {
          console.error('Error fetching posts:', error);
          this.loading = false; // Turn off component loading state
        }
      });
  }
  
  // Use loading overlay for search
  submitSearch(): void {
    if (this.searchInput !== this.searchTerm) {
      this.loadingOverlay.show(); // Show overlay with custom message
      this.searchTerm = this.searchInput;
      this.currentPage = 1; // Reset to first page on new search
      this.loadPosts();
    }
  }
  
  // Use loading overlay for reset search
  resetSearch(): void {
    if (this.searchTerm) {
      this.loadingOverlay.show(); // Show overlay
      this.searchInput = '';
      this.searchTerm = '';
      this.currentPage = 1;
      this.loadPosts();
    }
  }
  
  // Pagination methods with loading overlay
  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.loadingOverlay.show(); // Show overlay
      this.currentPage++;
      this.loadPosts();
      // Scroll to top of blog section
      document.querySelector('.blog-section')?.scrollIntoView({ behavior: 'smooth' });
    }
  }
  
  prevPage(): void {
    if (this.currentPage > 1) {
      this.loadingOverlay.show(); // Show overlay
      this.currentPage--;
      this.loadPosts();
      // Scroll to top of blog section
      document.querySelector('.blog-section')?.scrollIntoView({ behavior: 'smooth' });
    }
  }

  // Method to go to a specific page with loading overlay
  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages && page !== this.currentPage) {
      this.loadingOverlay.show(); // Show overlay with page number
      this.currentPage = page;
      this.loadPosts();
      // Scroll to top of blog section
      document.querySelector('.blog-section')?.scrollIntoView({ behavior: 'smooth' });
    }
  }
  
  // Main method for loading posts (with overlay)
  loadPosts(): void {
    if (this.searchTerm) {
      this.wordpresService.searchPosts(this.searchTerm, this.postsPerPage, this.currentPage)
        .subscribe({
          next: (response) => {
            this.posts = response.posts;
            this.totalPages = response.totalPages;
            this.loadingOverlay.hide(); // Hide the overlay when done
          },
          error: (error) => {
            console.error('Error searching posts:', error);
            this.loadingOverlay.hide(); // Hide the overlay even on error
          }
        });
    } else {
      this.wordpresService.getPosts(this.postsPerPage, this.currentPage)
        .subscribe({
          next: (response) => {
            this.posts = response.posts;
            this.totalPages = response.totalPages;
            this.loadingOverlay.hide(); // Hide the overlay when done
          },
          error: (error) => {
            console.error('Error fetching posts:', error);
            this.loadingOverlay.hide(); // Hide the overlay even on error
          }
        });
    }
  }

  // Method to generate the pagination array with responsive behavior
  getPaginationArray(): number[] {
    // Adjust pages to show based on screen width
    let pagesToShow = window.innerWidth < 576 ? 3 : 5;
    const pages: number[] = [];
    
    // Logic for showing limited page numbers with ellipsis
    if (this.totalPages <= pagesToShow) {
      // If total pages are less than pages to show, display all pages
      for (let i = 1; i <= this.totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always include first page
      pages.push(1);
      
      // Calculate start and end of page numbers around current page
      let start = Math.max(2, this.currentPage - Math.floor((pagesToShow - 3)/2));
      let end = Math.min(this.totalPages - 1, start + pagesToShow - 4);
      
      // Adjust start if end is at max
      if (end === this.totalPages - 1) {
        start = Math.max(2, this.totalPages - pagesToShow + 2);
      }
      
      // Add ellipsis before middle pages if needed
      if (start > 2) {
        pages.push(-1); // Use -1 to represent ellipsis
      }
      
      // Add middle pages
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      
      // Add ellipsis after middle pages if needed
      if (end < this.totalPages - 1) {
        pages.push(-2); // Use -2 to represent ellipsis
      }
      
      // Always include last page
      pages.push(this.totalPages);
    }
    
    return pages;
  }

  // Add window resize listener to update pagination when screen size changes
  @HostListener('window:resize')
  onResize() {
    // Force refresh of pagination display
    this.getPaginationArray();
  }
  
  // Helper methods for display
  extractFeaturedImage(content: string): string {
    if (!content) return '';
    
    // Look for the figure tag in the content
    const figureStart = content.indexOf('<figure');
    if (figureStart === -1) return '';
    
    const figureEnd = content.indexOf('</figure>', figureStart);
    if (figureEnd === -1) return '';
    
    // Return the figure with everything inside it
    return content.substring(figureStart, figureEnd + 9); // +9 to include "</figure>"
  }

  getCategoryName(categoryId: number): string {
    const category = this.categories.find(cat => cat.id === categoryId);
    return category ? category.name : 'Unknown Category';
  }

  getTagName(tagId: number): string {
    const tag = this.tags.find(t => t.id === tagId);
    return tag ? tag.name : 'Unknown Tag';
  }
  
  formatDate(dateString: string): string {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  }
  
  stripHtml(html: string): string {
    if (isPlatformBrowser(this.platformId)) {
      // Browser-only code
      const doc = new DOMParser().parseFromString(html, 'text/html');
      return doc.body.textContent || '';
    } 
    // Server-side alternative
    return html.replace(/<[^>]*>/g, '');
  }

  getReadingTime(html: string): number {
    if (!html) return 0;
    
    const text = this.stripHtml(html);
    const words = text.split(/\s+/).length;
    const wpm = 225; // Average reading speed
    return Math.ceil(words / wpm);
  }
}