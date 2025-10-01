import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Categories } from './categories';

@Injectable({
  providedIn: 'root'
})
export class WordpressService {
  // private apiUrl = 'http://localhost/wordpress/index.php/wp-json/wp/v2'

  private apiUrl = 'https://bwr.life/wp-json/'
  private formApiUrl = 'https://apis.spur.fit/CF/api/LeadGen/insertNewLeadFromForm'
  private defaultCoachID = 'e4dc080a-07b5-4503-83f5-08d016f8a37b'; // Default coach ID


  constructor(private http: HttpClient) { }
  // /**
  //  * Submit contact form data to the API
  //  * @param formData The contact form data
  //  * @returns Observable with the API response
  //  */
  // submitContactForm(formData: any): Observable<any> {
  //   // Prepare the payload
  //   const payload = {
  //     coachID: this.defaultCoachID,
  //     name: formData.name,
  //     email: formData.your_email,
  //     answeredForm: [
  //       { question: 'Age', answer: formData.age, type: 'Number Select' },
  //       { question: 'Your gender', answer: formData.gender, type: 'Single Select' },
  //       { question: 'Your Height', answer: formData.height, type: 'Number Select' },
  //       { question: 'Your Weight', answer: formData.weight, type: 'Number Select' },
  //       { question: 'What are your main goals?', answer: formData.main_goals, type: 'Multi-line type' },
  //       { question: 'Are you looking at Offline, Online or App based DIY program?', answer: formData.your_program, type: 'Multi-line type' },
  //       { question: 'Phone Number', answer: formData.tel_660, type: 'Phone Number' },
  //     ],
  //   };

  //   // Set headers
  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //   });

  //   // Make the POST request
  //   return this.http.post(this.formApiUrl, payload, { headers });
  // }

  submitContactForm(formData: any): Observable<any> {
    // Prepare the payload as FormData
    const payload = new FormData();
    payload.append('_wpcf7', '12'); // Form ID
    payload.append('_wpcf7_version', '6.0.6');
    payload.append('_wpcf7_locale', 'en_US');
    payload.append('_wpcf7_unit_tag', 'wpcf7-f12-p6-o1');
    payload.append('_wpcf7_container_post', '6');
    payload.append('_wpcf7_posted_data_hash', '');
    payload.append('first_name', formData.first_name);
    payload.append('age', formData.age);
    payload.append('location', formData.location);
    payload.append('tel_660', formData.tel_660);
    payload.append('your_email', formData.your_email);
    payload.append('your_subject', formData.your_subject);
    payload.append('your_message', formData.your_message);
    payload.append('_wpcf7_ak_hp_textarea', '');
    payload.append('_wpcf7_ak_js', Date.now().toString()); // Generate a timestamp for `_wpcf7_ak_js`
  
    // Make the POST request
    return this.http.post(`${this.apiUrl}contact-form-7/v1/contact-forms/12/feedback`, payload);
  }

  getPosts(perPage: number = 6, page: number = 1): Observable<any> {
    let params = new HttpParams()
      .set('per_page', perPage.toString())
      .set('page', page.toString());
    
    return this.http.get<any>(`${this.apiUrl}wp/v2/posts`, { 
      params, 
      observe: 'response' 
    }).pipe(
      map(response => {
        const totalPages = response.headers.get('X-WP-TotalPages');
        const totalPosts = response.headers.get('X-WP-Total');
        
        return {
          posts: response.body,
          totalPages: totalPages ? parseInt(totalPages) : 1,
          totalPosts: totalPosts ? parseInt(totalPosts) : response.body.length
        };
      })
    );
  }
  
  /**
 * Get a single post by ID
 * @param id The post ID to fetch
 * @returns Observable containing the post data
 */
getSinglePost(id: number): Observable<any> {
  return this.http.get<any>(`${this.apiUrl}wp/v2/posts/${id}?_embed`);
}
  

  getCategories(): Observable<any> {
    return this.http.get<Categories[]>(`${this.apiUrl}wp/v2/categories`);
  }

  getCategoryPosts(id: number): Observable<any> {
    return this.http.get<Categories[]>(`${this.apiUrl}wp/v2post?categories=${id}`);
  }

  getTags(): Observable<any> {
    return this.http.get<Categories[]>(`${this.apiUrl}wp/v2/tags`);
  }

  /**
   * Search for posts containing a specific search term
   * @param searchTerm The term to search for
   * @param perPage Number of posts per page (default: 6)
   * @param page Page number (default: 1)
   * @returns Observable with search results
   */
  searchPosts(searchTerm: string, perPage: number = 6, page: number = 1): Observable<any> {
    // Create query parameters
    let params = new HttpParams()
      .set('search', searchTerm)
      .set('per_page', perPage.toString())
      .set('page', page.toString());
    
    // Return the HTTP request with response headers
    return this.http.get<any>(`${this.apiUrl}wp/v2/posts`, { 
      params, 
      observe: 'response' 
    }).pipe(
      map(response => {
        const totalPages = response.headers.get('X-WP-TotalPages');
        const totalPosts = response.headers.get('X-WP-Total');
        
        return {
          posts: response.body,
          totalPages: totalPages ? parseInt(totalPages) : 1,
          totalPosts: totalPosts ? parseInt(totalPosts) : response.body.length
        };
      })
    );
  }

  /**
   * Get posts filtered by category
   * @param categoryId The category ID to filter by
   * @param perPage Number of posts per page (default: 6)
   * @param page Page number (default: 1)
   * @returns Observable with filtered posts
   */
  getPostsByCategory(categoryId: number, perPage: number = 6, page: number = 1): Observable<any> {
    let params = new HttpParams()
      .set('categories', categoryId.toString())
      .set('per_page', perPage.toString())
      .set('page', page.toString());
    
    return this.http.get<any>(`${this.apiUrl}wp/v2/posts`, { 
      params, 
      observe: 'response' 
    }).pipe(
      map(response => {
        const totalPages = response.headers.get('X-WP-TotalPages');
        const totalPosts = response.headers.get('X-WP-Total');
        
        return {
          posts: response.body,
          totalPages: totalPages ? parseInt(totalPages) : 1,
          totalPosts: totalPosts ? parseInt(totalPosts) : response.body.length
        };
      })
    );
  }

  /**
   * Get posts filtered by tag
   * @param tagId The tag ID to filter by
   * @param perPage Number of posts per page (default: 6)
   * @param page Page number (default: 1)
   * @returns Observable with filtered posts
   */
  getPostsByTag(tagId: number, perPage: number = 6, page: number = 1): Observable<any> {
    let params = new HttpParams()
      .set('tags', tagId.toString())
      .set('per_page', perPage.toString())
      .set('page', page.toString());
    
    return this.http.get<any>(`${this.apiUrl}wp/v2/posts`, { 
      params, 
      observe: 'response' 
    }).pipe(
      map(response => {
        const totalPages = response.headers.get('X-WP-TotalPages');
        const totalPosts = response.headers.get('X-WP-Total');
        
        return {
          posts: response.body,
          totalPages: totalPages ? parseInt(totalPages) : 1,
          totalPosts: totalPosts ? parseInt(totalPosts) : response.body.length
        };
      })
    );
  }

  /**
   * Advanced search with multiple filters
   * @param options Object containing search parameters
   * @returns Observable with search results
   */
  advancedSearch(options: {
    search?: string,
    categories?: number[],
    tags?: number[],
    author?: number,
    perPage?: number,
    page?: number,
    orderBy?: 'date' | 'relevance' | 'id' | 'include' | 'title' | 'slug',
    order?: 'asc' | 'desc'
  }): Observable<any> {
    let params = new HttpParams();
    
    // Add search term if provided
    if (options.search) {
      params = params.set('search', options.search);
    }
    
    // Add categories if provided
    if (options.categories && options.categories.length > 0) {
      params = params.set('categories', options.categories.join(','));
    }
    
    // Add tags if provided
    if (options.tags && options.tags.length > 0) {
      params = params.set('tags', options.tags.join(','));
    }
    
    // Add author if provided
    if (options.author) {
      params = params.set('author', options.author.toString());
    }
    
    // Add pagination
    params = params.set('per_page', options.perPage?.toString() || '6');
    params = params.set('page', options.page?.toString() || '1');
    
    // Add ordering
    if (options.orderBy) {
      params = params.set('orderby', options.orderBy);
    }
    
    if (options.order) {
      params = params.set('order', options.order);
    }
    
    return this.http.get<any>(`${this.apiUrl}/posts`, { 
      params, 
      observe: 'response' 
    }).pipe(
      map(response => {
        const totalPages = response.headers.get('X-WP-TotalPages');
        const totalPosts = response.headers.get('X-WP-Total');
        
        return {
          posts: response.body,
          totalPages: totalPages ? parseInt(totalPages) : 1,
          totalPosts: totalPosts ? parseInt(totalPosts) : response.body.length
        };
      })
    );
  }
}