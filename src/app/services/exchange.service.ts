import { Injectable } from '@angular/core';
import * as SocketIOFileUpload from 'socketio-file-upload';
import { ConnectService } from './connect.service';
import { Vol } from '../models/vol';
import { TSMap } from 'typescript-map';
import { EtatCpdlc } from '../models/etatCpdlc';
import { Etat } from '../models/enumEtat';
import { NavigationService } from './navigation.service';
import { DetailCpdlc } from '../models/detailCpdlc';



@Injectable({
  providedIn: 'root'
})
export class ExchangeService {
  private socket: SocketIOClient.Socket;

  private listeVols;
  private listeEtats;
  private selectedplnid: number = 0;
  private vemgsaFileName: string;
  private lplnFileName: string;
  private vol;



  constructor(private _connectService: ConnectService, private _navigationService: NavigationService) {
    this.socket = _connectService.connexionSocket;
    this.initSocket();
  }


  public testJson() {
    let plnid = 8474;
    let lplnfilename = "lpln";
    let vemgsafilename = ["vemgsa"];
    this.socket.emit('analysing', plnid, lplnfilename, vemgsafilename);

  }


  public analyseFiles(plnid: number, lplnfilename: string, vemgsafilename: string[]): void {
    console.log("analyseFilesService ", "plnid: ", plnid, 'lplnfilename : ', lplnfilename, 'vemgsafilename : ', vemgsafilename);
    this.socket.emit('analysing', plnid, lplnfilename, vemgsafilename);
  }

  public analysePlnId(file: string): void {
    console.log("analyseFilesService", file);
    this.socket.emit('analysingPlnid', file);
  }


  public getPlnid(): number {
    return this.selectedplnid;
  }



  public getListeVolsTrouves(): Array<any> {
    console.log('Exchange : getListeVolsTrouves');
    return this.listeVols;
  }

  public getListEtats(): Array<any> {
    console.log('Exchange : getListEtats');
    return this.listeEtats;
  }

  public getVol(): Vol{
    console.log('fonction getVol de exchange service');
    return this.vol;
  }

  private initSocket() {
    this.socket.on('analysedPlnid', (array) => {
      console.log('analysedPlnid from serveur : ', array);
      this.listeVols = array;

    });
    this.socket.on('analysedVol', (array) => {
      console.log('analysedVol from serveur : ', array);
      this.listeEtats = array;
      //DEBUG :
      let data: Array<any> = this.getListEtats();
      //console.log("donnes recuperes : ", data);
      console.log("arcid : ", data['arcid']);
      console.log("plnid : ", data['plnid']);
      console.log("listeLogs: ", data['listeLogs']);
      let arcid: string = data['arcid'];
      let plnid: number = data['plnid'];

      
     let etatCpldcTemp0= new EtatCpdlc(0, "CPCNXTCNTR", "26/09/2018", "07H56'49\"", "NON_LOGUE", false,null); 
     let etatCpldcTemp1= new EtatCpdlc(1, "CPCNXTCNTR2", "27/09/2018", "08H56'49\"", "NON_LOGUE", true,null); 
     let etatCpldcTemp2= new EtatCpdlc(2, "CPCNXTCNTR3", "26/09/2018", "07H56'49\"", "NON_LOGUE", false, null); 
     let etatCpldcTemp3= new EtatCpdlc(3, "CPCNXTCNTR4", "27/09/2018", "08H56'49\"", "NON_LOGUE", true, null); 
      let etatCpldcTemp : EtatCpdlc[] = [etatCpldcTemp0,etatCpldcTemp1,etatCpldcTemp2,etatCpldcTemp3];
      this.vol = new Vol("ESY123", plnid,"AIX", etatCpldcTemp);
      console.log("donnes recuperes : ", this.vol);
      this._navigationService.navigateToVisualisation();
      

        /** 
         * {
            "id": 0,
            "title": "CPCNXTCNTR",
            "date": "26/09/2018",
            "heure": "07H56'49\"",
            "etat" : "NON_LOGUE",
            "associable": false,
            "detailLog":
              [{ "key": "TITLE", "value": "CPCNXTCNTR" },
              { "key": "PLNID", "value": "8474" },
              { "key": "UNITID", "value": "LSAG" },
              { "key": "TFLOGONMODE", "value": "A" }
              ]
          }
         */
        

         Object.keys(data['listeLogs']).forEach(function (key){
           const etatCpdlcTemp = data['listeLogs'][key];
           let id = etatCpdlcTemp['id'] ;
           let title = etatCpdlcTemp['title'] ;
           let date = etatCpdlcTemp['date'] ;
           let heure = etatCpdlcTemp['heure'] ;
           let etat =etatCpdlcTemp['etat'] ;
           let associable = etatCpdlcTemp['associable'] ;
           let detailLog: DetailCpdlc[] = etatCpdlcTemp['detailLog'] ;
           this.etatCpdlc = new EtatCpdlc(id, title, date, heure, etat, associable, detailLog); 
           Object.keys(this.etatCpdlc.getDetailLog()).forEach(function (value){
             console.log("test value: ",etatCpdlcTemp['detailLog'][value]);
             console.log("test index: ",value);
           });
           
           console.log(data['listeLogs'][key]['infoMap']);
       });


      });

  }


}

