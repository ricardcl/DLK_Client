import { Injectable } from '@angular/core';
import * as SocketIOFileUpload from 'socketio-file-upload';
import { ConnectService }  from './connect.service';
import { Vol } from '../models/vol';
import { EtatCpdlc } from '../models/etatCpdlc';
import { DetailCpdlc } from '../models/detailCpdlc';


@Injectable({
  providedIn: 'root'
})
export class ExchangeService {
  private socket: SocketIOClient.Socket;

  private listeVols;
  private etatCpldc : EtatCpdlc;
  private selectedplnid : number = 0;
  private vemgsaFileName : string;
  private lplnFileName : string;



  constructor(private _connectService : ConnectService) { 
    this.socket = _connectService.connexionSocket;
    this.initSocket();
  }

  
  public testJson(){
    let plnid = 9694;
    let lplnfilename = "lpln";
    let  vemgsafilename = ["vemgsa"];
    this.socket.emit('analysing', plnid, lplnfilename, vemgsafilename);
    
  }


  public analyseFiles(plnid : number,  lplnfilename: string, vemgsafilename: string[]): void {
    console.log ("analyseFilesService ", "plnid: ", plnid, 'lplnfilename : ',lplnfilename, 'vemgsafilename : ', vemgsafilename);
    this.socket.emit('analysing', plnid, lplnfilename, vemgsafilename);
  }

  public analysePlnId(file: string): void {
    console.log ("analyseFilesService", file);
    this.socket.emit('analysingPlnid', file);
  }


  public getPlnid() : number{
    return this.selectedplnid;
  }
  


  public getListeVolsTrouves() : Array<any> {
    console.log('Exchange : getListeVolsTrouves');
    return this.listeVols;
  }

  public getListEtats() : EtatCpdlc {
    console.log('Exchange : getListEtats');
    return this.etatCpldc;
  }

  private initSocket(){
    this.socket.on('analysedPlnid',(array)=>{
      console.log('analysedPlnid from serveur : ',array);
      this.listeVols = array ;

    });
    this.socket.on('analysedVol',(array)=>{
      console.log('analysedVol from serveur : ',array);

      //DEBUG :
    //  let data : Array<any> = this.getListEtats();
     let data : Array<any> = array;
    console.log("donnes recuperes : ",data);
    console.log("arcid : ",data['arcid']);
    console.log("plnid : ",data['plnid']);
      let arcid : string = data['arcid'];
      let plnid : number = data['plnid'];
      let vol = new Vol(arcid, plnid);
      console.log("longueur :  ",data['listeLogs'].length);
 
    Object.keys(data['listeLogs']).forEach(function (key){
      const etatCpdlcTemp = data['listeLogs'][key];
      let id = etatCpdlcTemp['id'] ;
      let title = etatCpdlcTemp['title'] ;
      let date = etatCpdlcTemp['date'] ;
      let heure = etatCpdlcTemp['heure'] ;
      let etat =etatCpdlcTemp['etat'] ;
      let associable = etatCpdlcTemp['associable'] ;
      let detailLog : DetailCpdlc[] = etatCpdlcTemp['detailLog'];
      console.log("test 1");
      this.etatCpldc= new EtatCpdlc(id, title, date, heure, etat, associable, detailLog); 
      console.log("test 2");
      Object.keys(this.etatCpldc.getDetaillog()).forEach(function (value){
        console.log("test value: ",etatCpdlcTemp['detailLog'][value]);
        console.log("test index: ",value); 
      });
  });


    });

  }


}

