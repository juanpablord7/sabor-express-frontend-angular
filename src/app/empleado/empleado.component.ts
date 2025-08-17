import { Component } from '@angular/core';

import { FormsModule } from "@angular/forms"
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-empleado',
  imports: [FormsModule, CommonModule],
  templateUrl: './empleado.component.html',
  styleUrl: './empleado.component.css'
})
export class EmpleadoComponent {

  nombre = "Juan";

  apellido = "Diaz";

  edad = 30;
  
  empresa = "Google"

  dontWrite = false;

  message = ""

  formComplete(event:Event){
    this.dontWrite = true
    if((<HTMLButtonElement>event.target).value == "complete"){
      this.message = "Usuario registrado exitosamente"
    }
    
  }

  formDelete(event:Event){
    this.dontWrite = false
    if((<HTMLButtonElement>event.target).value == "delete"){
      this.message = "Usuario eliminado exitosamente"
      this.empresa = ""
    }
  }

}
