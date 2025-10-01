import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { WordpressService } from '../wordpress.service';
import { RouterModule } from '@angular/router';
import { forkJoin, switchMap } from 'rxjs';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css'
})
export class PostsComponent implements OnInit {
  post: any = null;
  loading: boolean = true;
  error: boolean = false;
  categories: any[] = [];
  tags: any[] = [];
  relatedPosts: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private wordpressService: WordpressService,
    private location: Location
  ) {}

  ngOnInit(): void {
    // Get the post ID from the route parameter
    this.route.paramMap.pipe(
      switchMap(params => {
        const postId = params.get('id');
        if (!postId) {
          throw new Error('No post ID provided');
        }
        
        this.loading = true;
        
        // Load categories and tags first
        return forkJoin({
          categories: this.wordpressService.getCategories(),
          tags: this.wordpressService.getTags(),
          post: this.wordpressService.getSinglePost(parseInt(postId, 10))
        });
      })
    ).subscribe({
      next: (results) => {
        this.categories = results.categories;
        this.tags = results.tags;
        this.post = results.post;
        
        // After getting post data, fetch related posts by category
        if (this.post && this.post.categories && this.post.categories.length > 0) {
          const categoryId = this.post.categories[0];
          this.loadRelatedPosts(categoryId, this.post.id);
        }
        
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching post:', error);
        this.loading = false;
        this.error = true;
      }
    });
  }

  // Load related posts from the same primary category
  loadRelatedPosts(categoryId: number, currentPostId: number): void {
    this.wordpressService.getPostsByCategory(categoryId, 3)
      .subscribe({
        next: (response) => {
          // Filter out the current post and take only 3
          this.relatedPosts = response.posts
            .filter((post: any) => post.id !== currentPostId)
            .slice(0, 3);
        },
        error: (error) => {
          console.error('Error fetching related posts:', error);
        }
      });
  }

  // Navigation method
  goBack(): void {
    this.location.back();
  }
  
  // Helper methods (similar to the blog component)
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
      month: 'long', 
      day: 'numeric' 
    });
  }
  
  getReadingTime(content: string): string {
    if (!content) return '1 min read';
    
    // Strip HTML tags and count words
    const text = content.replace(/<\/?[^>]+(>|$)/g, '');
    const wordCount = text.split(/\s+/).length;
    
    // Average reading speed is about 200-250 words per minute
    const readingTimeMinutes = Math.ceil(wordCount / 225);
    
    return `${readingTimeMinutes} min read`;
  }
}