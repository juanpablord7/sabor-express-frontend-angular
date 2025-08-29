import { Component, inject, Input } from '@angular/core';
import CartItem from '../../../models/cartItem.model';
import Product from '../../../models/product.model';
import { FormatCurrencyService } from '../../../utils/format-currency/format-currency.service';
import { ShoppingCartService } from '../../../services/shopping-cart/shopping-cart.service';
import { ImageApiService } from '../../../services/api/image-api.service';

@Component({
  selector: 'app-cart-item',
  imports: [],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.css'
})
export class CartItemComponent {
  @Input() cartItem: CartItem;
  @Input() product?: Product;

  private imageApiService = inject(ImageApiService);

  imagePath = this.imageApiService.getImageUrl

  formatCurrencyService = inject(FormatCurrencyService);
  shoppingCartService = inject(ShoppingCartService)

  formatCurrency(price: number){
    return this.formatCurrencyService.getFormat(price)
  }

  removeFromCart(){
    if(this.product){
      return this.shoppingCartService.removeFromCart(this.product.id);
    }
    else if(this.cartItem){
      return this.shoppingCartService.removeFromCart(this.cartItem.id);
    }
  }

}
