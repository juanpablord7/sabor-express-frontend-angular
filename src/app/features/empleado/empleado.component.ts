import { Component, Input } from '@angular/core';

import Empleado from "../../core/models/empleado.model"
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-empleado',
  imports: [FormsModule, CommonModule],
  templateUrl: './empleado.component.html',
  styleUrl: './empleado.component.css'
})
export class EmpleadoComponent {
  @Input() empleado:Empleado;

}
