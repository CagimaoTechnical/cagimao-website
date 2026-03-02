import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { isPlatformBrowser } from '@angular/common';
import { filter } from 'rxjs';
import { FloatingWhatsappComponent } from './components/shared/floating-whatsapp/floating-whatsapp.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,HeaderComponent,FooterComponent,FloatingWhatsappComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'cagimao-web';


  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    // Check if we're in the browser before using window
    if (isPlatformBrowser(this.platformId)) {
      // Scroll to top when this component is initialized
      window.scrollTo(0, 0);
      
      // Listen for route changes
      this.router.events.pipe(
        filter(event => event instanceof NavigationEnd)
      ).subscribe((event: NavigationEnd) => {
        // Scroll to top on regular navigation
        window.scrollTo(0, 0);
        
        // Handle fragment scrolling
        const tree = this.router.parseUrl(event.url);
        if (tree.fragment) {
          // Wait a bit for the component to render
          setTimeout(() => {
            const element = document.querySelector('#' + tree.fragment);
            if (element) {
              element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }, 100);
        }
      });
    }
  }
}
