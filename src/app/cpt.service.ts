import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import * as siofu from 'socketio-file-upload';

@Injectable({
  providedIn: 'root'
})
export class CptService {
  private socket: SocketIOClient.Socket;
  public Cpt: number = 0;

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
    var sock = this.socket;
    document.getElementById('boutonVersServeur').addEventListener('click', function () {
      console.log("Salut serveur, ça va ");
      sock.emit('message', 'Salut serveur, ça va ?');
    });

    document.getElementById('boutonCharger').addEventListener('click', function () {
      let form = document.forms["formulaire"];
      let plnid = form.elements["plnid"].value;
      let arcid = form.elements["arcid"].value;
      let fichierLpln = form.elements["inputFileLpln"].value;
      let fichierVemgsa = form.elements["inputFileVemgsa"].files;
      let tabfichierVemgsa = [];

      // On parcourt la liste des fichiers sélectionnées
      for (var i = 0; i < fichierVemgsa.length; i++) {
        console.log(i);
        tabfichierVemgsa[i] = fichierVemgsa[i].name;
      }
      console.log("plnid : " + plnid);
      console.log("arcid : " + arcid);
      console.log("fichierVemgsa : " + tabfichierVemgsa);
      console.log("fichierLpln : " + fichierLpln);
      sock.emit('chargement_des_fichiers', arcid, plnid, fichierLpln, tabfichierVemgsa);
    });




  }
}
