import { Injectable } from '@angular/core';
import { ConnectService } from './connect.service';
import { Vol } from '../models/vol';
import { EtatCpdlc } from '../models/etatCpdlc';
import { DetailCpdlc } from '../models/detailCpdlc';
import { checkAnswer, checkAnswerInitial, etatTransfertFrequence, etatLogonConnexionSimplifiee, etatLogonConnexion, erreurVol } from '../models/checkAnswer';
import { GestionVolsService } from './gestion-vols.service';
import { creneauHoraire } from '../models/date';
import { Identifiants, inputData } from '../models/identifiants';



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
  private database;


  constructor(private _connectService: ConnectService, private _gestionVolsService: GestionVolsService) {
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


    this.socket.on('database', (array) => {
      this.database = array;
      console.log("this.database", this.database);

    });

    this.socket.on('ftp', (array) => {
      console.log('ftp: ', array);
    });

    this.socket.on('check', (array) => {
      console.log('analysedDataInput from serveur : check : ', array);
      this.checkAnswer = array;
      console.log("this.checkAnswer.analysePossible: ", this.checkAnswer.analysePossible);
      console.log("this.checkAnswer.checkLPLN: ", this.checkAnswer.checkLPLN);
      console.log("this.checkAnswer.checkVEMGSA: ", this.checkAnswer.checkVEMGSA);
      //console.log("this.checkAnswer.arcid: ", this.checkAnswer.arcid);
      //console.log("this.checkAnswer.plnid: ", this.checkAnswer.plnid);
      console.log("this.checkAnswer.listeIdentifiants: ", this.checkAnswer.listeIdentifiants);

    });




    this.socket.on('analysedVol', (type, inputData: inputData, arrayLpln, arrayVemgsa, arrayMix) => {
      this.initExchange();
      console.log("type de fichier LPLN ou VEMGSA ou MIX : ", type);
      console.log('analysedVol from serveur ( lpln ): ', arrayLpln);
      console.log('analysedVol from serveur ( vemgsa ): ', arrayVemgsa);
      console.log('analysedVol from serveur ( mix ): ', arrayMix);
      console.log('analysedVol inputData: ', inputData);
      console.log('inputData', inputData.vemgsafilename);
      //DEBUG :

      let data: Array<any>;
      switch (type) {
        case "LPLN":
          data = arrayLpln;
          break;
        case "VEMGSA":
          data = arrayVemgsa;
          break;
        case "MIX":
          data = arrayMix;
          break;
        default:
          break;
      }


      //console.log("donnes recuperes : ", data);
      console.log("arcid : ", data['arcid']);
      console.log("plnid : ", data['plnid']);
      console.log("listeLogs: ", data['listeLogs']);
      let id: string = data['id'];
      let arcid: string = data['arcid'];
      let plnid: number = data['plnid'];
      let adep: string = data['adep'];
      let ades: string = data['ades'];
      let date: string = data['date'];
      let adrModeSInf: string = data['adrModeSInf'];
      let adrDeposee: string = data['adrDeposee'];
      let equipementCpdlc: boolean = data['equipementCpdlc'];
      let logonInitie: boolean = data['logonInitie'];
      let logonAccepte: boolean = data['logonAccepte'];
      let isConnexionInitiee: boolean = data['isConnexionInitiee'];
      let isConnexionEtablie: boolean = data['isConnexionEtablie'];
      let isConnexionPerdue: boolean = data['isConnexionPerdue'];

      let cmpAdrModeS: boolean = data['cmpAdrModeS'];
      let cmpAdep: boolean = data['cmpAdep'];
      let cmpAdes: boolean = data['cmpAdes'];
      let cmpArcid: boolean = data['cmpArcid'];
      let conditionsLogon: boolean = data['conditionsLogon'];
      let haslogCpdlc: boolean = data['haslogCpdlc'];
      let islogCpdlcComplete: boolean = data['islogCpdlcComplete'];

      let timelineEtatLogonConnexion: etatLogonConnexionSimplifiee[] = data['timelineEtatLogonConnexion'];
      let listeEtatTransfertFrequenceM: etatTransfertFrequence[] = data['listeEtatTransfertFrequence'];
      let listeErreurs: erreurVol[] = data['listeErreurs'];


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
        let detailLog: DetailCpdlc[] = etatCpdlcTemp['detailLog'];
        let explication = etatCpdlcTemp['explication'];
        this.listeEtats.push(new EtatCpdlc(id, title, date, jour, heure, etat, associable, log, detailLog, explication));

        Object.keys(etatCpdlcTemp['detailLog']).forEach(function (value) {
          //  console.log("test value: ", etatCpdlcTemp['detailLog'][value]);
          //  console.log("test index: ", value);
        });
      }



      let listeLogsLpln: EtatCpdlc[] = null;
      let listeLogsVemgsa: EtatCpdlc[] = null;
      let listeLogsMix: EtatCpdlc[] = null;


      if ((type == "LPLN") || (type == "MIX")) {

        let dataL: Array<any> = arrayLpln;
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
          let detailLog: DetailCpdlc[] = etatCpdlcTemp['detailLog'];
          let explication = etatCpdlcTemp['explication'];

          this.listeEtatsLpln.push(new EtatCpdlc(id, title, date, jour, heure, etat, associable, log, detailLog, explication));
        };

        listeLogsLpln = this.listeEtats;
      }

      if ((type == "VEMGSA") || (type == "MIX")) {
        let dataV: Array<any> = arrayVemgsa;
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
          let detailLog: DetailCpdlc[] = etatCpdlcTemp['detailLog'];
          let explication = etatCpdlcTemp['explication'];
          this.listeEtatsVemgsa.push(new EtatCpdlc(id, title, date, jour, heure, etat, associable, log, detailLog, explication));
        };


        listeLogsVemgsa = this.listeEtats;
      }
      if (type == "MIX") {
        listeLogsLpln = this.listeEtatsLpln;
        listeLogsVemgsa = this.listeEtatsVemgsa;
        listeLogsMix = this.listeEtats;
      }



      this.vol = new Vol(id, arcid, plnid, "AIX", adep, ades, date, adrModeSInf, adrDeposee, equipementCpdlc, logonInitie, logonAccepte, isConnexionInitiee, isConnexionEtablie, isConnexionPerdue, cmpAdrModeS, cmpAdep, cmpAdes,
        cmpArcid, conditionsLogon, haslogCpdlc, islogCpdlcComplete, timelineEtatLogonConnexion, listeEtatTransfertFrequenceM, listeLogsLpln, listeLogsVemgsa, listeLogsMix, listeErreurs, inputData);
      console.log("donnes recuperes de  MIX : ", this.vol);
      this._gestionVolsService.addVol(this.vol);

    });




  }







  public analyseDataInput(arcid: string, plnid: number, fileLplnName: string, fileVemgsaName: string[]): void {
    this.resetCheckAnswer();
    this.socket.emit('analyseDataInput', arcid, Number(plnid), fileLplnName, fileVemgsaName);

  }


  public analyseFiles(idCompletSelectionne: Identifiants, lplnFileName: string, vemgsaFileName: string[]): void {
    console.log("analyseFilesService ", "arcid: ", idCompletSelectionne.arcid, "plnid: ", idCompletSelectionne.plnid, 'creneauHoraire', idCompletSelectionne.dates, 'lplnFileName : ', lplnFileName, 'vemgsaFileName : ', vemgsaFileName);
    this.socket.emit('analysing', idCompletSelectionne, lplnFileName, vemgsaFileName, this.checkAnswer);

  }


  public getPlnid(): number {
    return this.selectedplnid;
  }

  private resetCheckAnswer(): void {
    this.checkAnswer = <checkAnswer>{};
  }




  public getVol(): Vol {
    console.log('fonction getVol de exchange service');
    return this.vol;
  }



  public getcheckResult() {
    return this.checkAnswer;
  }

  public getDatabase() {
    //console.log("Exchange getDatabase", this.database);
    return this.database;
  }

  public getVolFromDatabase(identifiant: string) {
    this.socket.emit('getVolFromDatabase', identifiant);
  }



}
