import { Injectable } from '@angular/core';

import User from '../../core/models/user.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  //Crear el usuario
  private myUser = new BehaviorSubject<User | null>(null);

  // Observable para que los componentes se suscriban
  user$: Observable<User | null> = this.myUser.asObservable();

  constructor() {}

  // Obtener el usuario actual (sin observable)
  get currentUser(): User | null {
    return this.myUser.value;
  }

  // Login → setear usuario
  login(user: User): void {
    this.myUser.next(user);
    localStorage.setItem('user', JSON.stringify(user)); // opcional: persistir
  }

  // Logout → borrar usuario
  logout(): void {
    this.myUser.next(null);
    localStorage.removeItem('user');
  }

  // Cargar usuario desde localStorage al iniciar app
  loadUser(): void {
    const stored = localStorage.getItem('user');
    if (stored) {
      this.myUser.next(JSON.parse(stored));
    }
  }
}
