import { TestBed } from '@angular/core/testing';

import { ShoppingCartService } from './shopping-cart.service';
import CartItem from '../../models/cartItem.model';

describe('ShoppingCartService', () => {
  let service: ShoppingCartService; 

  const item = {id: 1, name: "Test name"}
  const item2 = {id: 2, name: "Test name 2"}

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShoppingCartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  
  it('should open and close the cart', () => {
    service.openCart();
    expect(service.isOpen()).toBeTrue();

    service.closeCart();
    expect(service.isOpen()).toBeFalse();
  });

  it('should start with empty cart', () => {
    expect(service.cartItems()).toEqual({});
    expect(service.cartQuantity()).toBe(0);
  });

  it('should add new item when increasing quantity first time', () => {
    spyOn(service.cartItems, 'set').and.callThrough();

    service.increaseQuantity(item.id, item.name);
    expect(service.getItemQuantity(item.id)).toBe(1);
    expect(service.cartItems.set).toHaveBeenCalled();
  });

  it('should increase quantity if item already exists', () => {
    service.increaseQuantity(item.id, item.name);
    service.increaseQuantity(item.id, item.name);

    expect(service.getItemQuantity(item.id)).toBe(2);
    expect(service.cartQuantity()).toBe(2);
  });

  it('should calculate the total quantity of items in the cart', () => {
    service.increaseQuantity(item.id, item.name);
    service.increaseQuantity(item2.id, item2.name);
    service.increaseQuantity(item2.id, item2.name);

    expect(service.getItemQuantity(item.id)).toBe(1);
    expect(service.getItemQuantity(item2.id)).toBe(2);
    expect(service.cartQuantity()).toBe(3);
  });

  it('should decrease quantity', () => {
    service.increaseQuantity(item.id, item.name);
    service.increaseQuantity(item.id, item.name);

    spyOn(service.cartItems, 'set').and.callThrough();

    service.decreaseQuantity(item.id);
    expect(service.getItemQuantity(item.id)).toBe(1);
    expect(service.cartItems.set).toHaveBeenCalled();
  });

  it('should remove item when decreasing quantity to zero', () => {
    service.increaseQuantity(item.id, item.name);
    expect(service.getItemQuantity(item.id)).toBe(1);

    service.decreaseQuantity(item.id);
    expect(service.getItemQuantity(item.id)).toBe(0);
    expect(service.cartItems()).toEqual({});
  });

  it('should remove item directly with removeFromCart', () => {
    service.increaseQuantity(item.id, item.name);
    expect(service.getItemQuantity(item.id)).toBe(1);

    spyOn(service.cartItems, 'set').and.callThrough();

    service.removeFromCart(item.id);
    expect(service.getItemQuantity(item.id)).toBe(0);
    expect(service.cartItems()).toEqual({});
    expect(service.cartItems.set).toHaveBeenCalled();
  });
});
