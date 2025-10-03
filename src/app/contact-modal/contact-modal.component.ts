import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { WordpressService } from '../wordpress.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-contact-modal',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './contact-modal.component.html',
  styleUrl: './contact-modal.component.css'
})
export class ContactModalComponent {
    contactForm!: FormGroup;
    isSubmitting = false;
  
    constructor(private fb: FormBuilder, 
      private wordpressService: WordpressService,
      public activeModal: NgbActiveModal
    ) {}

    ngOnInit(): void {
      this.contactForm = this.fb.group({
        first_name: ['', Validators.required],
        age: ['', [Validators.required, Validators.min(1)]],
        location: ['', Validators.required],
        country_code: ['+91', [Validators.required, Validators.pattern('^\\+\\d{1,3}$')]], // Default country code
        tel_660: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
        your_email: ['', [Validators.required, Validators.email]],
        your_subject: ['', Validators.required],
        your_message: ['', Validators.required],
      });
    }
  
    onSubmit(): void {
      if (this.contactForm.valid) {
        this.isSubmitting = true;
    
        // Combine country code and phone number
        const phoneNumber = `${this.contactForm.value.country_code}${this.contactForm.value.tel_660}`;
    
        // Prepare the form data
        const formData = {
          ...this.contactForm.value,
          tel_660: phoneNumber, // Replace tel_660 with the combined phone number
        };
    
        this.wordpressService.submitContactForm(formData).subscribe({
          next: (response) => {
            // Check if the response status is 'mail_sent'
            if (response && response.status === 'mail_sent') {
              alert('Form submitted successfully!');
              this.contactForm.reset();
            } else {
              alert('Failed to send the form. Please try again.');
            }
            this.isSubmitting = false;
          },
          error: (error) => {
            console.error('Error submitting form:', error);
            alert('Failed to submit the form. Please try again.');
            this.isSubmitting = false;
          },
        });
      } else {
        Object.keys(this.contactForm.controls).forEach((key) => {
          const control = this.contactForm.get(key);
          if (control) {
            control.markAsTouched();
          }
        });
      }
    }

}
