import { Injectable } from '@angular/core';
import CartItem from '../../models/cartItem.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor() { }


  cartItems: CartItem[] = [];

  isOpen: Boolean = false;

  openCart = () => { this.isOpen = true }
  closeCart = () => { this.isOpen = false}
  cartQuantity = this.cartItems.reduce((quantity, item) => 
        item.quantity + quantity, 0
  )

  getItemQuantity(id:number){
    
    return this.cartItems.find(item => item.id === id)?.quantity || 0
  }

  increaseQuantity(id: number, name: string) {
    const item = this.cartItems.find(i => i.id === id);

    if (item == null) {
      this.cartItems.push({ id, quantity: 1, name });
    } else {
      item.quantity++;
    }
  }


  decreaseQuantity(id: number) {
    const item = this.cartItems.find(i => i.id === id);

    if (item && item.quantity === 1) {
      this.cartItems = this.cartItems.filter(i => i.id !== id);
    } else if (item) {
      item.quantity--;
    }
  }

  removeFromCart(id: number) {
    this.cartItems = this.cartItems.filter(i => i.id !== id);
  }

}
