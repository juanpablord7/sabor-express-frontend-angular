import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartItemComponent } from './cart-item.component';
import { ImageApiService } from '../../../services/api/image-api.service';
import { FormatCurrencyService } from '../../../utils/format-currency/format-currency.service';
import { ShoppingCartService } from '../../../services/shopping-cart/shopping-cart.service';
import { By } from '@angular/platform-browser';
import { fireEvent, screen } from '@testing-library/angular';

describe('CartItemComponent', () => {
  let component: CartItemComponent;
  let fixture: ComponentFixture<CartItemComponent>;

  let imageApiService: ImageApiService;
  let formatCurrencyService: FormatCurrencyService;
  let shoppingCartService: ShoppingCartService;

  const cartItem = { id: 1, name: 'Test Item', quantity: 2 };
  const product = { id: 1,  name: 'Test Item', image: 'img.png', price: 50, category: 1 };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartItemComponent],
      providers: [ImageApiService, FormatCurrencyService, ShoppingCartService]
    }).compileComponents();

    fixture = TestBed.createComponent(CartItemComponent);
    component = fixture.componentInstance;

    imageApiService = TestBed.inject(ImageApiService);
    formatCurrencyService = TestBed.inject(FormatCurrencyService);
    shoppingCartService = TestBed.inject(ShoppingCartService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should remove product from cart when product input exists', () => {
    component.product = product;
    spyOn(shoppingCartService, 'removeFromCart').and.callThrough();

    component.removeFromCart();
    expect(shoppingCartService.removeFromCart).toHaveBeenCalledWith(product.id);
  });

  it('should remove cartItem from cart when only cartItem exists', () => {
    component.cartItem = cartItem;
    spyOn(shoppingCartService, 'removeFromCart').and.callThrough();

    component.removeFromCart();
    expect(shoppingCartService.removeFromCart).toHaveBeenCalledWith(cartItem.id);
  });

  it('should render cart item name and quantity', () => {
    component.cartItem = cartItem;
    component.product = product;
    spyOn(formatCurrencyService, 'getFormat').and.callFake(p => '$' + p);
    fixture.detectChanges();

    expect(screen.getByText(cartItem.name)).toBeTruthy();
    expect(screen.getByText(`x${cartItem.quantity}`)).toBeTruthy();
  });

  it('should render product price and total', () => {
    component.cartItem = cartItem;
    component.product = product;
    spyOn(formatCurrencyService, 'getFormat').and.callFake(p => '$' + p);
    fixture.detectChanges();

    const formattedPrice = component.formatCurrency(product.price);
    const formattedTotal = component.formatCurrency(product.price * cartItem.quantity);

    expect(screen.getByText(formattedPrice)).toBeTruthy();
    expect(screen.getByText(formattedTotal)).toBeTruthy();
  });

  it('should render product image', () => {
    component.cartItem = cartItem;
    component.product = product;
    spyOn(imageApiService, 'getImageUrl').and.returnValue('url/img.png');
    fixture.detectChanges();

    const img = screen.getByRole('img', { name: product.image }) as HTMLImageElement;
    expect(img.src).toContain(product.image);
  });

  it('should call removeFromCart when button is clicked', () => {
    component.cartItem = cartItem;
    component.product = product;
    fixture.detectChanges();

    spyOn(component, 'removeFromCart').and.callThrough();
    spyOn(shoppingCartService, 'removeFromCart').and.callThrough();

    const button = screen.getByRole('button', { name: /eliminar/i });
    fireEvent.click(button);

    expect(component.removeFromCart).toHaveBeenCalled();
    expect(shoppingCartService.removeFromCart).toHaveBeenCalledWith(product.id);
  });

});
