import { Component, inject, Input } from '@angular/core';
import Product from '../../../../core/models/product.model';
import { ShoppingCartService } from '../../../../features/shopping-cart/service/shopping-cart.service';

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

  quantity(): number {
    return this.shoppingCartService.getItemQuantity(this.product.id);
  }

  increaseQuantity() {
    this.shoppingCartService.increaseQuantity(this.product.id, this.product.name);
  }

  decreaseQuantity() {
    this.shoppingCartService.decreaseQuantity(this.product.id);
  }

  removeFromCart() {
    this.shoppingCartService.removeFromCart(this.product.id);
  }
}
