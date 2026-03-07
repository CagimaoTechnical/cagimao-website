import { Component } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterModule } from '@angular/router';
import emailjs from '@emailjs/browser';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, NgIf],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  isSubmitting = false;
  isSubmittingWhatsApp = false;
  showSuccess = false;
  formSubmitted = false;

  // Form data model
  formData = {
    name: '',
    email: '',
    mobile: '',
    subject: '',
    message: ''
  };

  // Your EmailJS credentials
  private publicKey = 'lI8yC5aRIFBU0drv7';
  private serviceId = 'service_7sumr7y';
  private templateId = 'template_402p5b5';

  // WhatsApp configuration
  private whatsappNumber = '971521463284'; // Your WhatsApp number

  constructor() {
    // Initialize EmailJS with your public key
    emailjs.init(this.publicKey);
  }

  // Format phone number as user types
  formatPhoneNumber(event: any): void {
    let value = event.target.value;
    
    // Remove all non-digit characters except +
    value = value.replace(/[^\d+]/g, '');
    
    // Ensure + is only at the beginning
    if (value.indexOf('+') > 0) {
      value = value.replace(/\+/g, '');
    }
    
    // Limit length to 15 digits + optional +
    if (value.length > 16) {
      value = value.slice(0, 16);
    }
    
    this.formData.mobile = value;
  }

  // Mobile number validation
  validateMobileNumber(): boolean {
    if (!this.formData.mobile) return false;
    
    // International phone number regex
    // Allows + followed by 8-15 digits
    const internationalPhoneRegex = /^\+[1-9]\d{7,14}$/;
    return internationalPhoneRegex.test(this.formData.mobile);
  }

  // Handle form submission for email
  onSubmit(form: NgForm) {
    this.formSubmitted = true;
    
    if (form.valid && this.validateMobileNumber() && !this.isSubmitting) {
      this.isSubmitting = true;

      // Prepare template parameters
      const templateParams = {
        from_name: this.formData.name,
        from_email: this.formData.email,
        from_phone: this.formData.mobile,
        subject: this.formData.subject,
        message: this.formData.message,
        reply_to: this.formData.email,
      };

      // Send email using EmailJS
      emailjs.send(this.serviceId, this.templateId, templateParams)
        .then(
          (response) => {
            console.log('Email sent successfully!', response);
            this.isSubmitting = false;
            this.showSuccess = true;
            this.resetForm();
            form.resetForm();
            this.formSubmitted = false;
            
            // Hide success message after 5 seconds
            setTimeout(() => {
              this.showSuccess = false;
            }, 5000);
          },
          (error) => {
            console.error('Failed to send email:', error);
            this.isSubmitting = false;
            alert('Failed to send message. Please try again or contact us via WhatsApp.');
          }
        );
    } else if (!this.validateMobileNumber() && this.formData.mobile) {
      alert('Please enter a valid international phone number');
    }
  }

// Handle WhatsApp submission
onWhatsAppSubmit(form: NgForm) {
  this.formSubmitted = true;
  
  // Use formData directly since it's now properly bound
  if (form.valid && this.validateMobileNumber()) {
    this.isSubmittingWhatsApp = true;

    // Format the message with all form data
    const message = `*New Contact Form Submission*
*Name:* ${this.formData.name}
*Email:* ${this.formData.email}
*Phone:* ${this.formData.mobile}
*Subject:* ${this.formData.subject}
*Message:* ${this.formData.message}`;
    
    // Encode for URL
    const encodedMessage = encodeURIComponent(message);
    
    // Open WhatsApp in a new tab
    window.open(`https://wa.me/${this.whatsappNumber}?text=${encodedMessage}`, '_blank');
    
    // Reset loading state
    this.isSubmittingWhatsApp = false;
    
    // Show success message briefly
    this.showSuccess = true;
    setTimeout(() => {
      this.showSuccess = false;
    }, 3000);
    
  } else if (!this.validateMobileNumber() && this.formData.mobile) {
    alert('Please enter a valid international phone number');
  }
}

  // Reset form data
  resetForm(): void {
    this.formData = {
      name: '',
      email: '',
      mobile: '',
      subject: '',
      message: ''
    };
  }
}