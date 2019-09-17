import { Injectable } from '@angular/core';
import { ConnectService } from './connect.service';
import { Vol } from '../models/vol';
import { EtatCpdlc } from '../models/etatCpdlc';
import { DetailCpdlc } from '../models/detailCpdlc';
import { checkAnswer, checkAnswerInitial } from '../models/checkAnswer';
import { GestionVolsService } from './gestion-vols.service';
import { datesFile } from '../models/date';



@Injectable({
  providedIn: 'root'
})




export class ExchangeService {




  private socket: SocketIOClient.Socket;
  private listeVols: any[];

  private listeEtats: EtatCpdlc[];
  private listeEtatsLpln: EtatCpdlc[];
  private listeEtatsVemgsa: EtatCpdlc[];
  private selectedplnid: number = 0;
  private vol: Vol;
  private checkAnswer = <checkAnswer>{};


  constructor(private _connectService: ConnectService, private _gestionVolsService: GestionVolsService) {
    // this.socket = _connectService.connexionSocket;
    this.initSocket();
  }


  private initExchange() {
    this.listeVols = [];
    this.listeEtats = [];
    this.listeEtatsLpln = [];
    this.listeEtatsVemgsa = [];
    this.selectedplnid = 0;
    this.vol = null;
  }




  private initSocket() {
    this.socket = this._connectService.connexionSocket;

    this.socket.on('analysedPlnid', (array) => {
      console.log('analysedPlnid from serveur : ', array);
      this.initExchange();

    });

    this.socket.on('check', (array) => {


      console.log('analysedDataInput from serveur : check : ', array);
      this.checkAnswer = array;

      console.log("this.checkAnswer.analysePossible: ", this.checkAnswer.analysePossible);
      console.log("this.checkAnswer.checkLPLN: ", this.checkAnswer.checkLPLN);
      console.log("this.checkAnswer.checkVEMGSA: ", this.checkAnswer.checkVEMGSA);
      console.log("this.checkAnswer.arcid: ", this.checkAnswer.arcid);
      console.log("this.checkAnswer.plnid: ", this.checkAnswer.plnid);
   


    });



    this.socket.on('analysedVol', (type, array) => {
      this.initExchange();
      console.log("type de fichier LPL ou VEMGSA : ", type);

      console.log('analysedVol from serveur : ', array);
      //DEBUG :
      let data: Array<any> = array;
      //console.log("donnes recuperes : ", data);
      console.log("arcid : ", data['arcid']);
      console.log("plnid : ", data['plnid']);
      console.log("listeLogs: ", data['listeLogs']);
      let id: string = data['id'];
      let arcid: string = data['arcid'];
      let plnid: number = data['plnid'];
      let adep: string = data['adep'];
      let ades: string = data['ades'];
      let adrModeSInf: string = data['adrModeSInf'];
      let adrDeposee: string = data['adrDeposee'];
      let equipementCpdlc: string = data['equipementCpdlc'];
      let logonInitie: string = data['logonInitie'];
      let logonAccepte: string = data['logonAccepte'];
      let cmpAdrModeS: string = data['cmpAdrModeS'];
      let cmpAdep: string = data['cmpAdep'];
      let cmpAdes: string = data['cmpAdes'];
      let cmpArcid: string = data['cmpArcid'];
      let conditionsLogon: string = data['conditionsLogon'];
      let haslogCpdlc:boolean =data['haslogCpdlc'];
      let islogCpdlcComplete:boolean=data['islogCpdlcComplete'];
     ;

      for (let key = 0; key < data['listeLogs'].length; key++) {
        const etatCpdlcTemp = data['listeLogs'][key];
        let id = etatCpdlcTemp['id'];
        let title = etatCpdlcTemp['title'];
        let date = etatCpdlcTemp['date'];
        let jour = etatCpdlcTemp['jour'];
        let heure = etatCpdlcTemp['heure'];
        let etat = etatCpdlcTemp['etat'];
        let associable = etatCpdlcTemp['associable'];
        let log = etatCpdlcTemp['log'];
        console.log("log complet: ", log);
        let detailLog: DetailCpdlc[] = etatCpdlcTemp['detailLog'];
        this.listeEtats.push(new EtatCpdlc(id, title, date, jour, heure, etat, associable, log, detailLog));
        Object.keys(etatCpdlcTemp['detailLog']).forEach(function (value) {
          console.log("test value: ", etatCpdlcTemp['detailLog'][value]);
          console.log("test index: ", value);
        });
      }

      if (type === "LPLN") {

        this.vol = new Vol(id, arcid, plnid, "AIX", adep, ades, adrModeSInf, adrDeposee, equipementCpdlc, logonInitie, logonAccepte, cmpAdrModeS, cmpAdep, cmpAdes,
          cmpArcid, conditionsLogon,haslogCpdlc, islogCpdlcComplete,this.listeEtats, null, null);
      }
      if (type === "VEMGSA") {
        this.vol = new Vol(id, arcid, plnid, "AIX", adep, ades, null, null, null, logonInitie, logonAccepte, cmpAdrModeS, cmpAdep, cmpAdes,
          cmpArcid, conditionsLogon, haslogCpdlc, islogCpdlcComplete,null, this.listeEtats, null);
      }
      console.log("donnes recuperes de LPLN ou VEMGSA : ", this.vol);
      this._gestionVolsService.addVol(this.vol);




    });


    this.socket.on('analysedVolMix', (arrayLpln, arrayVemgsa, arrayMix) => {
      this.initExchange();
      console.log('analysedVol from serveur ( lpln ): ', arrayLpln);
      console.log('analysedVol from serveur ( vemgsa ): ', arrayVemgsa);
      console.log('analysedVol from serveur ( mix ): ', arrayMix);
      //DEBUG :
      let dataM: Array<any> = arrayMix;
      //console.log("donnes recuperes : ", data);
      console.log("arcid : ", dataM['arcid']);
      console.log("plnid : ", dataM['plnid']);
      console.log("listeLogs: ", dataM['listeLogs']);
      let id: string = dataM['id'];
      let arcid: string = dataM['arcid'];
      let plnid: number = dataM['plnid'];
      let adep: string = dataM['adep'];
      let ades: string = dataM['ades'];
      let adrModeSInf: string = dataM['adrModeSInf'];
      let adrDeposee: string = dataM['adrDeposee'];
      let equipementCpdlc: string = dataM['equipementCpdlc'];
      let logonInitie: string = dataM['logonInitie'];
      let logonAccepte: string = dataM['logonAccepte'];
      let cmpAdrModeS: string = dataM['cmpAdrModeS'];
      let cmpAdep: string = dataM['cmpAdep'];
      let cmpAdes: string = dataM['cmpAdes'];
      let cmpArcid: string = dataM['cmpArcid'];
      let conditionsLogon: string = dataM['conditionsLogon'];
      let haslogCpdlc:boolean =dataM['haslogCpdlc'];
      let islogCpdlcComplete:boolean=dataM['islogCpdlcComplete'];

      for (let key = 0; key < dataM['listeLogs'].length; key++) {
        const etatCpdlcTemp = dataM['listeLogs'][key];
        let id = etatCpdlcTemp['id'];
        let title = etatCpdlcTemp['title'];
        let date = etatCpdlcTemp['date'];
        let jour = etatCpdlcTemp['jour'];
        let heure = etatCpdlcTemp['heure'];
        let etat = etatCpdlcTemp['etat'];
        let associable = etatCpdlcTemp['associable'];
        let log = etatCpdlcTemp['log'];
        let detailLog: DetailCpdlc[] = etatCpdlcTemp['detailLog'];
        this.listeEtats.push(new EtatCpdlc(id, title, date, jour, heure, etat, associable, log, detailLog));
        Object.keys(etatCpdlcTemp['detailLog']).forEach(function (value) {
          console.log("test value: ", etatCpdlcTemp['detailLog'][value]);
          console.log("test index: ", value);
        });
      }



      ////LOGS LPLN
      let dataL: Array<any> = arrayLpln;
      //console.log("donnes recuperes : ", data);
      console.log("arcid : ", dataL['arcid']);
      console.log("plnid : ", dataL['plnid']);
      console.log("listeLogs: ", dataL['listeLogs']);
      let arcidLpln: string = dataL['arcid'];
      let plnidLpln: number = dataL['plnid'];
      let adrModeSInfLpln: string = dataL['adrModeSInf'];
      let adrDeposeeLpln: string = dataL['adrDeposee'];
      let equipementCpdlcLpln: string = dataL['equipementCpdlc'];


      for (let key = 0; key < dataL['listeLogs'].length; key++) {
        const etatCpdlcTemp = dataL['listeLogs'][key];
        let id = etatCpdlcTemp['id'];
        let title = etatCpdlcTemp['title'];
        let date = etatCpdlcTemp['date'];
        let jour = etatCpdlcTemp['jour'];
        let heure = etatCpdlcTemp['heure'];
        let etat = etatCpdlcTemp['etat'];
        let associable = etatCpdlcTemp['associable'];
        let log = etatCpdlcTemp['log'];
        console.log("log complet: ", log);
        let detailLog: DetailCpdlc[] = etatCpdlcTemp['detailLog'];
        this.listeEtatsLpln.push(new EtatCpdlc(id, title, date,jour, heure, etat, associable, log, detailLog));
        Object.keys(etatCpdlcTemp['detailLog']).forEach(function (value) {
          console.log("test value: ", etatCpdlcTemp['detailLog'][value]);
          console.log("test index: ", value);
        });
      };

      ////LOGS VEMGSA
      let dataV: Array<any> = arrayVemgsa;
      //console.log("donnes recuperes : ", data);
      console.log("arcid : ", dataV['arcid']);
      console.log("plnid : ", dataV['plnid']);
      console.log("listeLogs: ", dataV['listeLogs']);
      let arcidVemgsa: string = dataV['arcid'];
      let plnidVemgsa: number = dataV['plnid'];

      for (let key = 0; key < dataV['listeLogs'].length; key++) {
        const etatCpdlcTemp = dataV['listeLogs'][key];
        let id = etatCpdlcTemp['id'];
        let title = etatCpdlcTemp['title'];
        let date = etatCpdlcTemp['date'];
        let jour = etatCpdlcTemp['jour'];
        let heure = etatCpdlcTemp['heure'];
        let etat = etatCpdlcTemp['etat'];
        let associable = etatCpdlcTemp['associable'];
        let log = etatCpdlcTemp['log'];
        console.log("log complet: ", log);
        let detailLog: DetailCpdlc[] = etatCpdlcTemp['detailLog'];
        this.listeEtatsVemgsa.push(new EtatCpdlc(id, title, date,jour,  heure, etat, associable, log, detailLog));
        Object.keys(etatCpdlcTemp['detailLog']).forEach(function (value) {
          console.log("test value: ", etatCpdlcTemp['detailLog'][value]);
          console.log("test index: ", value);
        });
      };


      this.vol = new Vol(id, arcid, plnid, "AIX", adep, ades, adrModeSInf, adrDeposee, equipementCpdlc, logonInitie, logonAccepte, cmpAdrModeS, cmpAdep, cmpAdes,
        cmpArcid, conditionsLogon,haslogCpdlc, islogCpdlcComplete, this.listeEtatsLpln, this.listeEtatsVemgsa, this.listeEtats);
      console.log("donnes recuperes de  MIX : ", this.vol);
      this._gestionVolsService.addVol(this.vol);

    });




  }







  public analyseDataInput(arcid: string, plnid: number, fileLplnName: string, fileVemgsaName: string[],chosenHoraire: string): void {
    console.log("analyseDataInputService : chosenHoraire",chosenHoraire);
    this.socket.emit('analyseDataInput', arcid, Number(plnid), fileLplnName, fileVemgsaName,chosenHoraire);

  }


  public analyseFiles(arcid: string, plnid: number, lplnFileName: string, vemgsaFileName: string[],chosenHoraire: string): void {
    console.log("analyseFilesService ", "arcid: ", arcid, "plnid: ", plnid, 'lplnFileName : ', lplnFileName, 'vemgsaFileName : ', vemgsaFileName, 'chosenHoraire : ');
    this.socket.emit('analysing', arcid, plnid, lplnFileName, vemgsaFileName, this.checkAnswer, chosenHoraire);

  }


  public getPlnid(): number {
    return this.selectedplnid;
  }





  public getVol(): Vol {
    console.log('fonction getVol de exchange service');
    return this.vol;
  }



  public getcheckResult() {
    return this.checkAnswer;
  }


}
