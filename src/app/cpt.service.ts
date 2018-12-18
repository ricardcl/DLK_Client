import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import * as siofu from 'socketio-file-upload';

@Injectable({
  providedIn: 'root'
})
export class CptService {
  private socket: SocketIOClient.Socket;
  public Cpt : number = 0;

  constructor() {
    this.socket = io.connect('http://localhost:4000');

    //chargement d'un fichier par le client pour l'envoyer au serveur
    var uploader = new siofu(this.socket);
   uploader.listenOnSubmit(document.getElementById("boutonCharger"), document.getElementById("inputFileVemgsa"));
   uploader.listenOnSubmit(document.getElementById("boutonCharger"), document.getElementById("inputFileLpln"));

   
  //gestion des connexions pour mettre a jour un compteur
    this.socket.on('cptUpdate', (cpt: number) => {
      console.log(cpt);
      this.Cpt = cpt;
    });
    this.socket.on('message', (message: string) => {
      console.log('msg du serveur : ' + message);
    }); 
   

    //gestion clic bouton pour envoyer un message au serveur
    var sock= this.socket;
    document.getElementById('boutonVersServeur').addEventListener('click',function ()   {
     console.log("Salut serveur, ça va ");
       sock.emit('message', 'Salut serveur, ça va ?');
    });

    document.getElementById('boutonCharger').addEventListener('click',function ()   {
        sock.emit('chargement_des_fichiers');
     });




   }
}
