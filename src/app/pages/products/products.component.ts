import { Component, OnInit } from '@angular/core';
import { SeoService } from '../../service/seo.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  constructor(private seo: SeoService) {}

  ngOnInit() {
    this.seo.setMetaTags({
      title: 'Products & Trading Categories - Cagimao General Trading | AURALIS FILORE UAE',
      description: 'Explore Cagimao\'s product categories: AURALIS FILORE branded products, textiles, packaging materials, accessories, and general industrial goods. Global distribution and sourcing.',
      keywords: 'AURALIS FILORE products, textiles UAE, packaging materials Dubai, industrial products, trading categories, sourcing goods',
      image: '/assets/images/products-cagimao.jpg'
    });
  }
}
