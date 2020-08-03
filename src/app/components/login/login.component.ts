import { Component } from '@angular/core';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent {

  constructor(private chatService: ChatService) { }

  ingresar(type: string){
    this.chatService.login(type);
  }

}
