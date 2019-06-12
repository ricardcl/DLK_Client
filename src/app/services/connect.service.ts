import { Injectable, OnInit } from '@angular/core';
import * as io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class ConnectService implements OnInit{
  ngOnInit(): void {
    console.log("OnInit ConnectService");
  
  }

  private socket: SocketIOClient.Socket;

  constructor() { 
    console.log("constructor ConnectService");
    this.socket = io.connect('http://localhost:4000');

  }

  public  createSocket(){
    console.log("creation socket ");
    this.socket = io.connect('http://localhost:4000');
  };

  public get connexionSocket() : SocketIOClient.Socket {
    console.log("appel connexionSocket");
    return this.socket;
  }
}
