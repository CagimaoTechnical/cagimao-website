import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../service/seo.service';

@Component({
  selector: 'app-face',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './face.component.html',
  styleUrl: './face.component.css'
})
export class FaceComponent implements OnInit {
  constructor(private seo: SeoService) {}

  ngOnInit() {
    this.seo.setMetaTags({
      title: 'Cagimao General Trading FZE - Reliable Trading & Sourcing Partner in the UAE',
      description: 'Cagimao General Trading FZE is a UAE-based general trading company providing dependable sourcing, procurement, and supply coordination. Official worldwide distributor of AURALIS FILORE.',
      keywords: 'Cagimao, general trading, UAE, sourcing, procurement, AURALIS FILORE, Dubai free zone, B2B trading',
      image: '/assets/images/cagimao-og.jpg'
    });
  }

}
