import { Component, inject, Input } from '@angular/core';
import Product from '../../../../core/models/product.model';
import { ShoppingCartService } from '../../../../core/services/shopping-cart/shopping-cart.service';
import { FormatCurrencyService } from '../../../../core/utils/format-currency/format-currency.service';
import { ImageApiService } from '../../../../core/services/api/image-api.service';

@Component({
  selector: 'app-store-item',
  imports: [],
  templateUrl: './store-item.component.html',
  styleUrl: './store-item.component.css'
})
export class StoreItemComponent {
  @Input({required: true}) product: Product;

  // Services:
  private shoppingCartService = inject(ShoppingCartService)

  private imageApiService = inject(ImageApiService)

  imagePath = this.imageApiService.getImageUrl

  formatCurrency(price: number){
    this.formatCurrency(price)
  }

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
