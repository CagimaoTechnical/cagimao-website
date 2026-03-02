import { Routes } from '@angular/router';

export const routes: Routes = [

// Homepage - most important for SEO
  { 
    path: '', 
    loadComponent: () => import('./pages/face/face.component').then(m => m.FaceComponent),
    title: 'Cagimao General Trading FZE - UAE Trading & Sourcing Partner'
  },
  
  // About page
  { 
    path: 'about', 
    loadComponent: () => import('./pages/about/about.component').then(m => m.AboutComponent),
    title: 'About Cagimao - UAE Free Zone Trading Company'
  },
  
  // Services page
  { 
    path: 'services', 
    loadComponent: () => import('./pages/services/services.component').then(m => m.ServicesComponent),
    title: 'Our Services - Global Distribution & B2B Sourcing'
  },
  
  // Products page
  { 
    path: 'products', 
    loadComponent: () => import('./pages/products/products.component').then(m => m.ProductsComponent),
    title: 'Products - AURALIS FILORE & Trading Categories'
  },
  
  // Contact page
  { 
    path: 'contact', 
    loadComponent: () => import('./pages/contact/contact.component').then(m => m.ContactComponent),
    title: 'Contact Cagimao - Get in Touch'
  },
  
  // Privacy Policy page
{ 
  path: 'privacy-policy', 
  loadComponent: () => import('./components/shared/privacy-policy/privacy-policy.component').then(m => m.PrivacyPolicyComponent),
  title: 'Privacy Policy - Cagimao General Trading FZE'
},
  // Wildcard route - redirect to home
  { 
    path: '**', 
    redirectTo: '' 
  }


];
