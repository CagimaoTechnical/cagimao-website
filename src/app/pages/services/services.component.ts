import { Component, OnInit } from '@angular/core';
import { SeoService } from '../../service/seo.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './services.component.html',
  styleUrl: './services.component.css'
})
export class ServicesComponent implements OnInit {
  constructor(private seo: SeoService) {}

  ngOnInit() {
    this.seo.setMetaTags({
      title: 'Our Services - Cagimao General Trading | Global Distribution & B2B Sourcing UAE',
      description: 'Explore Cagimao\'s comprehensive services: Global distribution for AURALIS FILORE, B2B sourcing, procurement support, general trading, and supply coordination in the UAE.',
      keywords: 'AURALIS FILORE distribution, B2B sourcing UAE, procurement services Dubai, general trading free zone, supply chain coordination, trade documentation',
      image: '/assets/images/services-cagimao.jpg'
    });
  }
}
