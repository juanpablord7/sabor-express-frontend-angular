import { inject, Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ImageApiService {
  private apiService = inject(ApiService);

  private apiPath: string = this.apiService.apiUrl

  private readonly imagePath = `${this.apiPath}/image`;

  constructor() { }

  getImageUrl(path: string) {
    return `${this.imagePath}/${path}`;
  }
}
