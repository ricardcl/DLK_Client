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

  private analyseState: UploaderState = UploaderState.UPLOADING;
  private listeVols;

  constructor(private _connectService : ConnectService) {
    this.socket = _connectService.connexionSocket;
    this.socketUploader = new SocketIOFileUpload(this.socket);
    this.initUploaderState();
    this.initSocket();
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

  public uploadFiles(files: File[]): void {
    this.socketUploader.submitFiles(files);
  }

  public isUploading(): boolean {
    return false;
  }

/**  FIN UPLOAD*/

  public analyseFiles(file: string): void {
    this.socket.emit('analysing', file);
  }

  public getPlnids() {
    return JSON.stringify(this.listeVols) ;
  }

  private initSocket(){
    this.socket.on('analysed',(array)=>{
      this.listeVols = array ;

      for (let i = 0; i < array.length; i++) {
        const element = array[i];
        console.log('donnees analysees' + array[i].arcid+"\n"+ array[i].plnid+"\n"+ array[i].sl);
        console.log(JSON.stringify(this.listeVols));
        this.analyseState = UploaderState.IDLE;
      }
    });
  }
  public get AnalyseState(): UploaderState {
    return this.analyseState;
  }

}

