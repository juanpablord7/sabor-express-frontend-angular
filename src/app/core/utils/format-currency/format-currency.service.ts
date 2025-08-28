import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormatCurrencyService {

  private CURRENCY_FORMATTER = new Intl.NumberFormat(
    undefined, { currency: "USD", style: "currency" }
  )

  getFormat(number: number){
      return this.CURRENCY_FORMATTER.format(number)
  }

  constructor() { }
}
