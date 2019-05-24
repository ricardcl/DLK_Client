import { Injectable } from '@angular/core';
import * as SocketIOFileUpload from 'socketio-file-upload';
import { ConnectService } from './connect.service';
import { Vol } from '../models/vol';
import { EtatCpdlc } from '../models/etatCpdlc';
import { Etat } from '../models/enumEtat';
import { NavigationService } from './navigation.service';
import { DetailCpdlc } from '../models/detailCpdlc';
import { checkAnswer } from '../models/checkAnswer';
import { CheckState } from '../models/CheckState';



@Injectable({
  providedIn: 'root'
})
export class ExchangeService {
  private socket: SocketIOClient.Socket;
  private listeVols : any[];

  private listeEtats: EtatCpdlc[];
  private selectedplnid: number = 0;
  //private vemgsaFileName: string;
  //private lplnFileName: string;
  private vol: Vol;
  private gestionPage: number =0; // 0 : page section-formulaire, 1 : page section-visualisation

  private checkAnswerInitial = <checkAnswer>{};
  private checkAnswer = <checkAnswer>{};

  constructor(private _connectService: ConnectService, private _navigationService: NavigationService) {
    this.socket = _connectService.connexionSocket;
    this.listeEtats = [];
    this.initSocket();
  }


  public testJson() {
    let plnid = 8474;
    let lplnfilename = "lpln";
    let vemgsafilename = ["vemgsa"];
    this.socket.emit('analysing', plnid, lplnfilename, vemgsafilename);

  }


  public analyseFiles(arcid: string, plnid: number, lplnfilename: string, vemgsafilename: string[]): void {
    console.log("analyseFilesService ", "arcid: ", arcid,"plnid: ", plnid, 'lplnfilename : ', lplnfilename, 'vemgsafilename : ', vemgsafilename);
    this.socket.emit('analysing', arcid, plnid, lplnfilename, vemgsafilename);
  }
  

  public analyseDataInput(arcid : string, plnid : number, fileLpln : string, fileVemgsa : string[]): void {
    console.log("analyseDataInputService");
    this.socket.emit('analyseDataInput', arcid, plnid, fileLpln,fileVemgsa );
  }

  


  public getPlnid(): number {
    return this.selectedplnid;
  }

  public getListeVolsTrouves(): Array<any> {
    console.log('Exchange : getListeVolsTrouves');
    return this.listeVols;
  }

  public getListeArcidTrouves(): string[] {
    console.log(" listeVols : " , this.listeVols);
    
    const arcidTab : string[] = ["test arcid 1","test arcid 2","test arcid 3"];
    if (this.listeVols !== undefined ) {
      this.listeVols.forEach(element => {
        arcidTab.push(element.arcid);
      });
    }
    /** console.log('Exchange : getListeVolsTrouves');
    this.listeVols.forEach(element => {
      arcidTab.push(element.arcid);
    });*/
    return arcidTab; 
  }
  



  public getVol(): Vol{
    console.log('fonction getVol de exchange service');
    return this.vol;
  }

  public getcheckState() {
    return this.checkState;
  }

  public getcheckResult() {
    return this.checkAnswer;
  }
  public getcheckInitialResult() {
    return this.checkAnswerInitial;
  }
  
  public getGestionPage() {
    return this.gestionPage;
  }

  public setGestionPage(value : number) {
     this.gestionPage=value;
  }

  private checkState: CheckState = CheckState.IDLE;




  private initSocket() {
    this.socket.on('analysedPlnid', (array) => {
      console.log('analysedPlnid from serveur : ', array);
      this.listeVols = array;

    });
    
    this.socket.on('checkInitial', (array) => {
      console.log('analysedDataInput from serveur : checkinitial : ', array);
      this.checkAnswerInitial.valeurRetour=array['valeurRetour'];
      this.checkAnswerInitial.messageRetour=array['messageRetour'];
      if (  this.checkAnswerInitial.valeurRetour === 0) {
        this.checkState = CheckState.CHECK_INI_OK;
        console.log("CheckState.CHECK_INI_OK");
        
      }
      else{
        this.checkState = CheckState.CHECK_INI_KO;
        console.log("CheckState.CHECK_INI_KO");
      }

      console.log('analysedDataInput from serveur : this.checkResult : ',this.checkAnswerInitial.valeurRetour, this.checkAnswerInitial.messageRetour);

    });

    this.socket.on('check', (array) => {
      console.log('analysedDataInput from serveur : check : ', array);
      this.checkAnswer.valeurRetour=array['valeurRetour'];
      this.checkAnswer.messageRetour=array['messageRetour'];
      this.checkAnswer.arcid=array['arcid'];
      this.checkAnswer.plnid=array['plnid'];
      if (  this.checkAnswer.valeurRetour === 0) {
        this.checkState = CheckState.CHECK_OK;
        console.log("CheckState.CHECK_OK");
      }
      else{
        this.checkState = CheckState.CHECK_KO;
        console.log("CheckState.CHECK_KO");
      }
    });

    this.socket.on('analysedVol', (array) => {
      console.log('analysedVol from serveur : ', array);
      //DEBUG :
      let data: Array<any> = array;
      //console.log("donnes recuperes : ", data);
      console.log("arcid : ", data['arcid']);
      console.log("plnid : ", data['plnid']);
      console.log("listeLogs: ", data['listeLogs']);
      let arcid: string = data['arcid'];
      let plnid: number = data['plnid'];
      
      for (let key = 0; key < data['listeLogs'].length; key++) {
        const etatCpdlcTemp = data['listeLogs'][key];
        let id = etatCpdlcTemp['id'] ;
        let title = etatCpdlcTemp['title'] ;
        let date = etatCpdlcTemp['date'] ;
        let heure = etatCpdlcTemp['heure'] ;
        let etat =etatCpdlcTemp['etat'] ;
        let associable = etatCpdlcTemp['associable'] ;
        let detailLog: DetailCpdlc[] = etatCpdlcTemp['detailLog'] ;
        this.listeEtats.push(new EtatCpdlc(id, title, date, heure, etat, associable, detailLog));
        Object.keys(etatCpdlcTemp['detailLog']).forEach(function (value){
          console.log("test value: ",etatCpdlcTemp['detailLog'][value]);
          console.log("test index: ",value);
        });           
      }

    this.vol = new Vol(arcid, plnid,"AIX",  this.listeEtats );
    console.log("donnes recuperes : ", this.vol);
   // this._navigationService.navigateToVisualisation();
    this.gestionPage=2;
      


      });

  }


}

