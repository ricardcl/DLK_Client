import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class CptService {
  private socket: SocketIOClient.Socket;
  public Cpt : number = 0;

  constructor() {
    this.socket = io.connect('http://localhost:4000');
    this.socket.on('cptUpdate', (cpt: number) => {
      console.log(cpt);
      this.Cpt = cpt;
    });
   }
}
