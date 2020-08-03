import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import { map } from 'rxjs/operators';

import { Mensaje } from '../Interface/mensaje.interface';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private itemsCollection: AngularFirestoreCollection<Mensaje>;
  public chats: Mensaje[] = [];

  constructor(private afs: AngularFirestore) { }

  cargarMensajes(){

    this.itemsCollection = this.afs.collection<Mensaje>('chats');

    return this.itemsCollection.valueChanges()
                              .pipe(
                                map( (mensajes: Mensaje[]) => {
                                  this.chats = mensajes;
                                })
                              );
  }

  agregarMensaje(texto: string){

    let mensaje: Mensaje = {
      nombre: 'demo',
      mensaje: texto,
      fecha: new Date().getTime()
    };

    return this.itemsCollection.add(mensaje);

  }
}
