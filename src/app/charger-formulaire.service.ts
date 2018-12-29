import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import * as SocketIOFileUpload from 'socketio-file-upload';

@Injectable({
  providedIn: 'root'
})
export class ChargerFormulaireService {

  private socket: SocketIOClient.Socket;
  private socketUploader : SocketIOFileUpload;

  constructor() {
    this.socket = io.connect('http://localhost:4000');
    this.socketUploader = new SocketIOFileUpload(this.socket);
  }

  public uploadFiles (files : File[]) : void {
    this.socketUploader.submitFiles(files);
  }

  public isUploading () : boolean {
    return false;
  }

}
