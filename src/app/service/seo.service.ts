import { Injectable, Inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  constructor(
    private meta: Meta,
    private title: Title,
    @Inject(DOCUMENT) private document: Document
  ) {}

  setMetaTags(config: {
    title: string;
    description: string;
    keywords?: string;
    image?: string;
    url?: string;
    author?: string;
    type?: 'website' | 'article' | 'product';
    publishedTime?: string;
    modifiedTime?: string;
    section?: string;
    tags?: string[];
  }) {
    // Basic meta tags
    this.title.setTitle(config.title);
    this.meta.updateTag({ name: 'description', content: config.description });
    
    if (config.keywords) {
      this.meta.updateTag({ name: 'keywords', content: config.keywords });
    }
    
    if (config.author) {
      this.meta.updateTag({ name: 'author', content: config.author });
    }

    // Open Graph (Facebook, LinkedIn)
    this.meta.updateTag({ property: 'og:title', content: config.title });
    this.meta.updateTag({ property: 'og:description', content: config.description });
    this.meta.updateTag({ property: 'og:image', content: config.image || '/assets/default-og-image.jpg' });
    this.meta.updateTag({ property: 'og:url', content: config.url || this.document.location.href });
    this.meta.updateTag({ property: 'og:type', content: config.type || 'website' });
    this.meta.updateTag({ property: 'og:site_name', content: 'Your Site Name' });

    // Twitter Cards
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: config.title });
    this.meta.updateTag({ name: 'twitter:description', content: config.description });
    this.meta.updateTag({ name: 'twitter:image', content: config.image || '/assets/default-og-image.jpg' });

    // Article specific meta tags
    if (config.type === 'article') {
      if (config.publishedTime) {
        this.meta.updateTag({ property: 'article:published_time', content: config.publishedTime });
      }
      if (config.modifiedTime) {
        this.meta.updateTag({ property: 'article:modified_time', content: config.modifiedTime });
      }
      if (config.section) {
        this.meta.updateTag({ property: 'article:section', content: config.section });
      }
      if (config.tags && config.tags.length) {
        config.tags.forEach(tag => {
          this.meta.updateTag({ property: 'article:tag', content: tag });
        });
      }
    }

    // Set canonical URL
    this.setCanonicalUrl(config.url);
  }

  setCanonicalUrl(url?: string) {
    const canonicalUrl = url || this.document.location.href;
    let link: HTMLLinkElement = this.document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    
    if (!link) {
      link = this.document.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.document.head.appendChild(link);
    }
    
    link.setAttribute('href', canonicalUrl.split('?')[0]); // Remove query parameters
  }

  addJsonLd(jsonLd: object) {
    const script = this.document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(jsonLd);
    this.document.head.appendChild(script);
  }
}