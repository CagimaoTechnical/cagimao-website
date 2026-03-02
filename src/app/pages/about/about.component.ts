import { Component, OnInit } from '@angular/core';
import { SeoService } from '../../service/seo.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent implements OnInit {
  constructor(private seo: SeoService) {}

  ngOnInit() {
    this.seo.setMetaTags({
      title: 'About Cagimao General Trading FZE - UAE Free Zone Trading Company',
      description: 'Cagimao General Trading FZE is a UAE Free Zone Establishment, officially appointed as global distribution partner for AURALIS FILORE. Learn about our values and commitment to quality.',
      keywords: 'about Cagimao, UAE free zone company, AURALIS FILORE distributor, Dubai trading company, B2B sourcing UAE',
      image: '/assets/images/about-cagimao.jpg'
    });
  }
}
