import { Component } from '@angular/core';

@Component({
  selector: 'app-aviso-registro',
  imports: [],
  templateUrl: './aviso-registro.component.html',
  styleUrl: './aviso-registro.component.css'
})
export class AvisoRegistroComponent {
  // Aquí puedes manejar la lógica de visibilidad del mensaje, por ejemplo:
  message = '¡Te has registrado correctamente!';
  show = true;

  // Método para ocultar el mensaje si es necesario
  closeMessage() {
    this.show = false;
  }
}
