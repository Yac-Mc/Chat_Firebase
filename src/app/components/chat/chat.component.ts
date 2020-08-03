import { Component } from '@angular/core';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styles: [
  ]
})
export class ChatComponent{

  mensaje = '';

  constructor(public chatService: ChatService) {
    this.chatService.cargarMensajes().subscribe();
  }

  enviarMensaje(){
    console.log(this.mensaje);

    if (this.mensaje.length === 0){
      return;
    }

    this.chatService.agregarMensaje(this.mensaje)
                    .then( () => this.mensaje = '')
                    .catch((error) => console.error('Error al enviar.', error));
  }

}
