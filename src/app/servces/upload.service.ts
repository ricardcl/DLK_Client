import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import * as SocketIOFileUpload from 'socketio-file-upload';
import {UploaderState} from '../models/uploaderState';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  private uploadState : UploaderState = UploaderState.IDLE;

  private socket: SocketIOClient.Socket;
  private socketUploader : SocketIOFileUpload;

  constructor() {
    this.socket = io.connect('http://localhost:4000');
    this.socketUploader = new SocketIOFileUpload(this.socket);
    this.initUploaderState();
  }

  private initUploaderState () : void {
    this.socketUploader.addEventListener('start', () => {
      this.uploadState = UploaderState.UPLOADING;
    });
    this.socketUploader.addEventListener('error', () => {
      this.uploadState = UploaderState.ERROR;
    });
    this.socketUploader.addEventListener('complete', () => {
      this.uploadState = UploaderState.IDLE;
    });
  }

  public get UploaderState () : UploaderState {
    return this.uploadState;
  }

  public uploadFiles (files : File[]) : void {
    this.socketUploader.submitFiles(files);
  }

  public isUploading () : boolean {
    return false;
  }

}
