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

  increaseQuantity(id:number, name:string){
    if (this.cartItems.find(item => item.id === id) == null){
      return [...this.cartItems, {id, quantity: 1, name: name}]
    } 
    else {
      return this.cartItems.map(item =>{
        if (item.id === id){
          return {...item, quantity: item.quantity + 1}
        } 
        else{
          return item
        }
      })
    }
  }

  decreaseQuantity(id:number){
    if (this.cartItems.find(item => item.id === id)?.quantity === 1){
      return this.cartItems.filter(item => item.id !== id)
    } 
    else {
      return this.cartItems.map(item =>{
        if (item.id === id){
          return {...item, quantity: item.quantity - 1}
        } else{
          return item
        }
      })
    }
  }

  removeFromCart(id:number){
    return this.cartItems.filter(item => item.id !== id)
  }
}
