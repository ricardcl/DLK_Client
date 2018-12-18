import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import * as SocketIOFileUpload from 'socketio-file-upload';

@Injectable({
  providedIn: 'root'
})
export class CptService {
  private socket: SocketIOClient.Socket;
  public Cpt : number = 0;

  constructor() {
    this.socket = io.connect('http://localhost:4000');

    var uploader = new SocketIOFileUpload(this.socket);
    uploader.listenOnInput(document.getElementById("siofu_input"));


    this.socket.on('cptUpdate', (cpt: number) => {
      console.log(cpt);
      this.Cpt = cpt;
    });
    this.socket.on('message', (message: string) => {
      console.log('msg du serveur : ' + message);
    }); 
   
    /** var pseudo = prompt('Quel est votre pseudo ?');
    this.socket.emit('petit_nouveau', pseudo);*/


    var sock= this.socket;
    document.getElementById('boutonVersServeur').addEventListener('click',function ()   {
     console.log("Salut serveur, ça va ");
       sock.emit('message', 'Salut serveur, ça va ?');
    });


   }
}
