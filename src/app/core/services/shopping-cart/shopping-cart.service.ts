import { computed, Injectable, signal } from '@angular/core';
import CartItem from '../../models/cartItem.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor() { }

  cartItems = signal<Record<number, CartItem>>({});

  isOpen = signal<boolean>(false);

  openCart = () => { this.isOpen.set(true) }
  closeCart = () => { this.isOpen.set(false) }
  
  cartQuantity = computed(() => {
    return Object.values(this.cartItems()).reduce(
      (quantity, item) => quantity + item.quantity,
      0
    );
  });

  getItemQuantity(id: number) {
    return this.cartItems()[id]?.quantity || 0;
  }

  increaseQuantity(id: number, name: string) {
    const current = { ...this.cartItems() };
    if (current[id]) {
      current[id].quantity++;
    } else {
      current[id] = { id, name, quantity: 1 };
    }
    this.cartItems.set(current);
  }

  decreaseQuantity(id: number) {
    const current = { ...this.cartItems() };
    if (!current[id]) return;

    if (current[id].quantity === 1) {
      delete current[id];
    } else {
      current[id].quantity--;
    }

    this.cartItems.set(current);
  }

  removeFromCart(id: number) {
    const current = { ...this.cartItems() };
    delete current[id];
    this.cartItems.set(current);
  }

}
