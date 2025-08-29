import { ComponentFixture,  TestBed } from '@angular/core/testing';
import { screen } from "@testing-library/angular"
import { ShoppingCartComponent } from './shopping-cart.component';
import { ShoppingCartService } from '../../services/shopping-cart/shopping-cart.service';
import { ProductService } from '../../../features/product/services/product.service';
import { signal } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import CartItem from '../../models/cartItem.model';


describe('ShoppingCartComponent', () => {
  let component: ShoppingCartComponent;
  let fixture: ComponentFixture<ShoppingCartComponent>;

  // Services:
  let shoppingCart: jasmine.SpyObj<ShoppingCartService>;
  let productService: jasmine.SpyObj<ProductService>;

  // Mock signals of the services
  let cartItemsSignal = signal<Record<number, CartItem>>(
    {1: { id: 1, name: 'Prod 1', quantity: 2 }}
  );
  let isOpen = signal<boolean>(true);

  beforeEach(async () => {
    cartItemsSignal.set(
      {1: { id: 1, name: 'Prod 1', quantity: 2 }}
    );
    
    shoppingCart = jasmine.createSpyObj('ShoppingCartService', [
      'closeCart',
      'cartItems',
      'isOpen'
    ]);

    (shoppingCart as any).cartItems = cartItemsSignal;
    (shoppingCart as any).isOpen = isOpen;
    productService = jasmine.createSpyObj('ProductService', [
      'findProducts'
    ]);

    // Mock to find the products
    productService.findProducts.and.callFake((ids: number[]) => {
      if (ids.includes(1)) {
        return of([{ id: 1, name: 'Prod 1', price: 50, category: 1, image: 'img1.png' }]);
      }
      if (ids.includes(2)) {
        return of([{ id: 2, name: 'Prod 2', price: 100, category: 2, image: 'img2.png' }]);
      }
      return of([]);
    });


    await TestBed.configureTestingModule({
      imports: [ShoppingCartComponent],
      providers: [
        { provide: ShoppingCartService, useValue: shoppingCart },
        { provide: ProductService, useValue: productService },
        { provide: Router, useValue: jasmine.createSpyObj('Router', ['navigate']) }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShoppingCartComponent);
    component = fixture.componentInstance;    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('closeCart() should call shoppingCart.closeCart()', () => {
    component.closeCart();
    expect(shoppingCart.closeCart).toHaveBeenCalled();
  });

  it('should load cartProducts with the initial products of the shopping cart', () => {
    const products = component.cartProducts();
    
    expect(products[1].name).toBe('Prod 1');
    expect(products[1].price).toBe(50);

    expect(productService.findProducts).toHaveBeenCalledWith([1]);
  });


  it('should detect a new product in cartItems and load it in cartProducts', () => {
    // Simulate a new products added to the shopping cart
    cartItemsSignal.set({
      1: { id: 1, name: 'Prod 1', quantity: 2 },
      2: { id: 2, name: 'Prod 2', quantity: 1 }
    });

    // Forzar ciclo de detección de cambios para refrescar la vista
    fixture.detectChanges();

    const products = component.cartProducts();

    // Ahora debe contener tanto el id=1 como el nuevo id=2
    expect(products[1].name).toBe('Prod 1');
    expect(products[2].name).toBe('Prod 2');
    expect(products[2].price).toBe(100);

    // El servicio debió ser llamado también con el id 2
    expect(productService.findProducts).toHaveBeenCalledWith([2]);
  });

  it('getTotalPrice() should sum items correctly', () => {
    cartItemsSignal.set({
      1: { id: 1, name: 'Product 1', quantity: 2 },
      2: { id: 2, name: 'Product 2', quantity: 3 }
    });

    component.cartProducts.set({
      1: { id: 1, name: 'Product 1', price: 10, category: 1, image: '' },
      2: { id: 2, name: 'Product 2', price: 20, category: 1, image: '' }
    });

    const total = component.getTotalPrice();
    expect(total).toBe(2 * 10 + 3 * 20); // 80
  });


  it('should render app-cart-item for each cartItem', () => {
    const items = fixture.debugElement.queryAll(By.css('app-cart-item'));
    expect(items.length).toBe(1);
  });

  it('should call service.closeCart() and handleCreateOrder() when clicking "Registrar Orden"', () => {
    const button = screen.getByText('Registrar Orden');

    button.click();

    expect(shoppingCart.closeCart).toHaveBeenCalled();
  });


});
