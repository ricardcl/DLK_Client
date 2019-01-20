import { Injectable } from '@angular/core';
import * as SocketIOFileUpload from 'socketio-file-upload';
import { ConnectService }  from './connect.service';


@Injectable({
  providedIn: 'root'
})
export class ExchangeService {
  private socket: SocketIOClient.Socket;

  private listeVols;


  constructor(private _connectService : ConnectService) { 
    this.socket = _connectService.connexionSocket;
    this.initSocket();
  }

  
  public analyseFiles(file: string): void {
    console.log ("analyseFilesService", file);
    this.socket.emit('analysing', file);
  }

  public getPlnids() {
    return JSON.stringify(this.listeVols) ;
  }

  public getListeVols() : Array<any> {
    return this.listeVols;
  }

  private initSocket(){
    this.socket.on('analysed',(array)=>{
      console.log(array);
      this.listeVols = array ;

    });
  }


}

