import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly apiBase = environment.apiBaseUrl;

  constructor() { }
  
  get apiUrl() {
    return this.apiBase;
  }
  
}
