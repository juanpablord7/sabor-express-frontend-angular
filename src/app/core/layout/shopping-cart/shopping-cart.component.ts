import { Component, computed, inject, signal } from '@angular/core';
import { ShoppingCartService } from '../../services/shopping-cart/shopping-cart.service';
import Product from '../../models/product.model';
import { ProductService } from '../../../features/product/services/product.service';
import { Router } from '@angular/router';
import User from '../../models/user.model';
import { CommonModule } from '@angular/common';
import { CartItemComponent } from "./cart-item/cart-item.component";

import { effect } from '@angular/core';
import CartItem from '../../models/cartItem.model';

@Component({
  selector: 'app-shopping-cart',
  imports: [CommonModule, CartItemComponent],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.css'
})
export class ShoppingCartComponent {
  router = inject(Router);

  shoppingCart = inject(ShoppingCartService);
  productService = inject(ProductService);

  cartItems = this.shoppingCart.cartItems;

  user: User = {
    id: 1,
    name: "Temporal",
    username: "temporal",
    email: "temporal@gmail.com",
    role: 1
  }

  isOpen = this.shoppingCart.isOpen

  closeCart(){
    this.shoppingCart.closeCart()
  }

  cartProducts = signal<Record<number, Product>>({});

  constructor(){

    // Update cartProducts when cartItems is updated 
    effect((): void => {
      const idsInCart = Object.keys(this.cartItems()).map(Number);
      const currentMap = this.cartProducts();

      const newIds = idsInCart.filter(id => !currentMap[id]);
      if (newIds.length) {
        this.productService.findProducts(newIds).subscribe(products => {
          const updated = { ...this.cartProducts() };
          products.forEach(p => (updated[p.id] = p));
          this.cartProducts.set(updated);
        });
      }
    });

    
  }

  
  trackById(index: number, item: {key: number, value: CartItem}) {
    return item.key;
  }

  getTotalPrice = computed(() => {
    return Object.values(this.cartItems()).reduce((total, item) => {
      const price = this.cartProducts()[item.id]?.price ?? 0;
      return total + price * item.quantity;
    }, 0);
  })


  
  handleCreateOrder () {
    this.closeCart()
    console.log("Nada")
  /*
    if(user){
        const productsOrder: number[] = [];
        const quantitiesOrder: number[] = [];
        cartItems.map(item => {
            productsOrder.push(item.id)
            quantitiesOrder.push(item.quantity)
            removerFromCart(item.id)
        })
        await createMyOrder(productsOrder, quantitiesOrder);

    }else{
        this.router.navigate(['/login']);
    }
  */
  }
}
