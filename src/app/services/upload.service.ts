import { Injectable } from '@angular/core';
import * as SocketIOFileUpload from 'socketio-file-upload';
import { UploaderState } from '../models/uploaderState';
import { ConnectService }  from './connect.service';


@Injectable({
  providedIn: 'root'
})
export class UploadService {
  private uploadState: UploaderState = UploaderState.IDLE;
  private socket: SocketIOClient.Socket;
  private socketUploader: SocketIOFileUpload;


  constructor(private _connectService : ConnectService) {
    this.socket = _connectService.connexionSocket;
    this.socketUploader = new SocketIOFileUpload(this.socket);
    this.initUploaderState();
   
  }

  private initUploaderState(): void {
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

  public get UploaderState(): UploaderState {
    return this.uploadState;
  }

  public uploadFiles(file: File, files: File[]): void {
    this.socketUploader.submitFiles(file, files);
  }

  public isUploading(): boolean {
    return false;
  }

/**  FIN UPLOAD*/

}