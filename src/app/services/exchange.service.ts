import { Injectable } from '@angular/core';
import * as SocketIOFileUpload from 'socketio-file-upload';
import { ConnectService }  from './connect.service';
import { Vol } from '../models/vol';
import { TSMap } from 'typescript-map';
import { EtatCpdlc } from '../models/etatCpdlc';


@Injectable({
  providedIn: 'root'
})
export class ExchangeService {
  private socket: SocketIOClient.Socket;

  private listeVols;
  private listeEtats;
  private selectedplnid : number = 0;
  private vemgsaFileName : string;
  private lplnFileName : string;



  constructor(private _connectService : ConnectService) { 
    this.socket = _connectService.connexionSocket;
    this.initSocket();
  }

  
  public testJson(){
    let plnid = 8474;
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

  public getListEtats() : Array<any> {
    console.log('Exchange : getListEtats');
    return this.listeEtats;
  }

  private initSocket(){
    this.socket.on('analysedPlnid',(array)=>{
      console.log('analysedPlnid from serveur : ',array);
      this.listeVols = array ;

    });
    this.socket.on('analysedVol',(array)=>{
      console.log('analysedVol from serveur : ',array);
      this.listeEtats = array ;
      //DEBUG :
      let data : Array<any> = this.getListEtats();
    console.log("donnes recuperes : ",data);
    console.log("arcid : ",data['arcid']);
    console.log("plnid : ",data['plnid']);
    console.log("listeLogs: ",data['listeLogs']);
      let arcid : string = data['arcid'];
      let plnid : number = data['plnid'];
      let vol = new Vol(arcid, plnid);
      console.log("listeLogs: 0 ",data['listeLogs'][0]);
      console.log("listeLogs: 1 ",data['listeLogs'][1]);
      console.log("longueur :  ",data['listeLogs'].length);
 
    Object.keys(data['listeLogs']).forEach(function (key){
      const etatCpdlcTemp = data['listeLogs'][key];
      let id = etatCpdlcTemp['id'] ;
      let title = etatCpdlcTemp['title'] ;
      let date = etatCpdlcTemp['date'] ;
      let heure = etatCpdlcTemp['heure'] ;
      let etat =etatCpdlcTemp['etat'] ;
      let associable = etatCpdlcTemp['associable'] ;
      console.log("id: ",id, "title: ", title, "date: ",date);
      let etatCpldcTemp : EtatCpdlc = new EtatCpdlc(id, title, date, heure, etat, associable); 
      let infomap : TSMap<string,string> = etatCpldcTemp.getInfoMap();
      Object.keys(etatCpdlcTemp['infoMap']).forEach(function (value){
        infomap[value]=etatCpdlcTemp['infoMap'][value];
        // {TITLE :  CPCEND} de la forme {value,etatCpdlcTemp['infoMap'][value] }
        console.log("test value: ",infomap[value]);
        console.log("test index: ",value);
      });
      
      console.log(data['listeLogs'][key]['infoMap']);
  });


    });

  }


}

