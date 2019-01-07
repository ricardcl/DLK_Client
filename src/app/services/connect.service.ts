import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class ConnectService {

  private socket: SocketIOClient.Socket;

  constructor() { 
    this.socket = io.connect('http://localhost:4000');
  }

  public get connexionSocket() : SocketIOClient.Socket {
    return this.socket;
  }
}
