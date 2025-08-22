import { Component, inject, Input } from '@angular/core';
import Product from '../../../../core/models/product.model';
import { ShoppingCartService } from '../../../../core/services/shopping-cart/shopping-cart.service';

import formatCurrency from '../../../../core/utils/formatCurrency';

@Component({
  selector: 'app-store-item',
  imports: [],
  templateUrl: './store-item.component.html',
  styleUrl: './store-item.component.css'
})
export class StoreItemComponent {
  @Input({required: true}) product!: Product;

  // Services:
  shoppingCartService = inject(ShoppingCartService)

  imagePath = ""

  

  formatCurrency = formatCurrency

  get quantity(): number {
    return this.shoppingCartService.getItemQuantity(this.product.id);
  }
}
