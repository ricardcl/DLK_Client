import { Injectable } from '@angular/core';
import * as SocketIOFileUpload from 'socketio-file-upload';
import { UploaderState } from '../models/uploaderState';
import { ConnectService } from './connect.service';
import { HttpClient } from '@angular/common/http';
import { map, filter, switchMap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UploadService {
  private uploadState: UploaderState = UploaderState.IDLE;
  private socket: SocketIOClient.Socket;
  private socketUploader: SocketIOFileUpload;


  constructor(private _connectService: ConnectService, private _http: HttpClient) {
    this.socket = _connectService.connexionSocket;
    this.socketUploader = new SocketIOFileUpload(this.socket);
    this.initUploaderState();

  }

  private initUploaderState(): void {
    this.socketUploader.addEventListener('start', () => {
      console.log("addEventListener start");
      this.uploadState = UploaderState.UPLOADING;
    });
    this.socketUploader.addEventListener('error', () => {
      console.log("addEventListener error");
      this.uploadState = UploaderState.ERROR;
    });
    this.socketUploader.addEventListener('complete', () => {
      console.log("addEventListener complete");
      this.uploadState = UploaderState.IDLE;
    });
  }

  public get UploaderState(): UploaderState {
    return this.uploadState;
  }

 

 public uploadFiles(files: File[]): void {
    this.socketUploader.submitFiles(files);
    console.log ("HELOOOOOOOOOO!!")
   // this._http.get<Object>("localhost:4000/download").subscribe((data: any) => {console.log(data);});
    //this._http.get<any>("http://localhost:4002/download").subscribe((data: any) => {console.log(data);});
    this._http.get<any>("/download").subscribe((data: any) => {console.log(data);});
  }

  public isUploading(): boolean {
    console.log("etat:",this.uploadFiles);
    
    return (this.uploadState == UploaderState.UPLOADING);
  }

  /**  FIN UPLOAD*/

}