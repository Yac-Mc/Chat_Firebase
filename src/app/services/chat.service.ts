import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { map } from 'rxjs/operators';

import { Mensaje } from '../Interface/mensaje.interface';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private itemsCollection: AngularFirestoreCollection<Mensaje>;
  public chats: Mensaje[] = [];
  public usuario: any = {};

  constructor(private afs: AngularFirestore, private afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(user => {
      if (!user){
        return;
      }

      this.usuario.nombre = user.displayName;
      this.usuario.uid = user.uid;
      this.usuario.photoURL = user.photoURL;
    });
  }

  login(type: string){

    if (type.toLowerCase() === 'google'){
      this.afAuth.auth.signInWithPopup( new firebase.auth.GoogleAuthProvider() );
    }else{
      this.afAuth.auth.signInWithPopup( new firebase.auth.TwitterAuthProvider() );
    }
  }

  logout(){
    this.usuario = {};
    this.afAuth.auth.signOut();
  }

  cargarMensajes(){

    this.itemsCollection = this.afs.collection<Mensaje>('chats', ref => ref.orderBy('fecha', 'desc')
                                                                            .limit(5));

    return this.itemsCollection.valueChanges()
                              .pipe(
                                map( (mensajes: Mensaje[]) => {
                                  this.chats = [];

                                  for (const mensaje of mensajes){
                                    this.chats.unshift(mensaje);
                                  }
                                })
                              );
  }

  agregarMensaje(texto: string){

    const mensaje: Mensaje = {
      nombre: this.usuario.nombre,
      mensaje: texto,
      fecha: new Date().getTime(),
      uid: this.usuario.uid
    };

    return this.itemsCollection.add(mensaje);

  }
}
