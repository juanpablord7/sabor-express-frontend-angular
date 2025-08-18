import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EmpleadosComponent } from './empleados/empleados.component';
import { NavbarComponent } from './navbar/navbar.component';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, EmpleadosComponent, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'shopping-cart';

  greet = "Hola Dog"
}
