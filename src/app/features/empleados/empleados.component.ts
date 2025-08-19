import { Component } from "@angular/core";
import { EmpleadoComponent } from "../empleado/empleado.component";

import { FormsModule } from "@angular/forms"
import { CommonModule } from '@angular/common';

import Empleado from "../../core/models/empleado.model";

@Component({
    selector: "app-empleados",
    templateUrl: "./empleados.component.html",
    styleUrls: ["./empleados.component.css"],
    imports: [EmpleadoComponent, FormsModule, CommonModule],
})
export class EmpleadosComponent{
    
  nombre = "Juan";

  apellido = "Diaz";

  edad = 30;
  
  empresa = "Google"

  dontWrite = false;

  message = ""

  entradas: Empleado[];

  constructor(){
    this.entradas = [
      {titulo:"Python me la pela", contenido: "Python"},
      {titulo:"Java me la pela", contenido: "Java"},
      {titulo:"C++ me la pela", contenido: "C++"},
      {titulo:"C# me la pela", contenido: "C#"},
    ]
  }

  formComplete(event:Event){
    this.dontWrite = true
    if((<HTMLButtonElement>event.target).value == "complete"){
      this.message = "Usuario registrado exitosamente"
    }
    this.entradas[1].contenido = "Calvooooo"
  }

  formDelete(event:Event){
    this.dontWrite = false
    if((<HTMLButtonElement>event.target).value == "delete"){
      this.message = "Usuario eliminado exitosamente"
      this.empresa = ""
    }
  }


}