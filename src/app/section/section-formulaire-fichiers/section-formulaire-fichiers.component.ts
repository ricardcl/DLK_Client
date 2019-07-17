import { Component, ViewChild, Output, EventEmitter, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { UploadService } from 'src/app/services/upload.service';
import { ExchangeService } from 'src/app/services/exchange.service';
import { UploaderState } from 'src/app/models/uploaderState';
import { Vol } from '../../models/vol';
import { ConnectService } from '../../services/connect.service';
import { CheckState } from 'src/app/models/CheckState';
import { GestionVolsService } from 'src/app/services/gestion-vols.service';



@Component({
  selector: 'app-section-formulaire-fichiers',
  templateUrl: './section-formulaire-fichiers.component.html',
  styleUrls: ['./section-formulaire-fichiers.component.css']
})
export class SectionFormulaireFichiersComponent implements OnDestroy, OnChanges, OnInit {

  ngOnInit(): void {
    console.log("OnInit SectionFormulaireFichiersComponent");
  }

  ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
    console.log("OnChanges SectionFormulaireFichiersComponent");
  }

  ngOnDestroy(): void {
    console.log("OnDestroy SectionFormulaireFichiersComponent");

  }

  @ViewChild('choseFileForm') choseFileForm; // on fait reference a la variable definie dans le html
  // @Output() alerteCanicule = new EventEmitter<number>();
  

  private selectedLplnFile: File;
  private selectedVemgsaFile: File[];
  //private selectedPlnid : number;
  private analyseState: boolean;
  private uploadDemande: boolean;
  private vemgsaFilesNames: string[];
  private plnid :FormControl;
  private arcid :FormControl;

  public initFormulaire() : void {
    console.log("initialisation demandee");
    this.selectedLplnFile= null;
    this.selectedVemgsaFile = [];
    this.analyseState = false;
    this.uploadDemande = false;
    this.vemgsaFilesNames= [];
    this.arcid = new FormControl('', [Validators.required, Validators.pattern(this.regexpArcid)]);
    this.plnid = new FormControl('', [Validators.required, Validators.pattern(this.regexpPlnid)]);
    
  }


  constructor(private _chargerFormulaireService: UploadService, private _exchangeService: ExchangeService, private _gestionVolsService: GestionVolsService) {
    console.log("coucou constructor");
    this.initFormulaire();

  }



 

  /** PARTIE DU FORMULAIRE POUR LA GESTION DES PLNID/ARCID */
  private identifiantSelectionne: string = 'Plnid';
  private identifiants: string[] = ['Arcid', 'Plnid'];
  private regexpPlnid: RegExp = /^\d{4}$/;
  private regexpArcid: RegExp = /^[a-z][a-z|0-9]{1,6}$/i;
 
  private getErrorMessagePlnid() {
    if (this.plnid.hasError('required')) { return 'Valeur obligatoire'; }
    if (!(this.regexpPlnid.test(this.plnid.value))) { return "format incorrect :un plnid est composé de 4 chiffres"; }
    return "";
  }

  private getErrorMessageArcid() {
    if (this.arcid.hasError('required')) { return 'Valeur obligatoire'; }
    if (!(this.regexpArcid.test(this.arcid.value))) { return "format incorrect arcid "; }
    return "";
  }

  private get isArcid(): boolean {
    return this.identifiantSelectionne === this.identifiants[0]
  }

  private get isPlnid(): boolean {
    return this.identifiantSelectionne === this.identifiants[1];
  }


  /*************************************************  ************************************************/



  /****************************** PARTIE FONCTIONS  D'UPLOAD *************************** */
  public get isUploading(): boolean {
    // console.log("etat:",this._chargerFormulaireService.UploaderState);

    return this._chargerFormulaireService.UploaderState === UploaderState.UPLOADING;
  }

  public get isUploaded(): boolean {
    return this._chargerFormulaireService.UploaderState === UploaderState.IDLE;
  }


  public updateSelectedLpln(file: File): void {
    console.log('hello' + file.name);
    this.selectedLplnFile = file;
    this.analyseState = false;
  }

  public updateSelectedVemgsa(file: File[]): void {
    for (let i = 0; i < file.length; i++) {
      console.log('hello' + file[i].name);
      this.selectedVemgsaFile.push(file[i]);
      this.vemgsaFilesNames.push(file[i].name);
    }
    this.analyseState = false;
  }

  public uploadFiles(): void {

    let selectedFile: File[] = [];
    selectedFile = this.selectedVemgsaFile;

    if (this.selectedLplnFile != null) {
      selectedFile.push(this.selectedLplnFile);
    }
    this._chargerFormulaireService.uploadFiles(selectedFile);
    this.uploadDemande = true;
    //this._chargerFormulaireService.uploadFiles(this.selectedLplnFile, this.selectedVemgsaFile); 



    
  }
  public uploadData(): void {
   
    if (this.selectedLplnFile !== null) {
      console.log("this.selectedLplnFile !== null");

      this.analyseDataInput(this.selectedLplnFile.name, this.vemgsaFilesNames);
    }
    else {
      console.log("this.selectedLplnFile == null");
      this.analyseDataInput("", this.vemgsaFilesNames);
    }
   // this.uploadDemande= false;
  }

  public get isUploadComplete(): boolean {
    return (this.uploadDemande && this.isUploaded);
  }


  public get isAnalyzed(): boolean {
    return this.analyseState;
  }

  public analyseDataInput(fileLpln: string, fileVemgsa: string[]): void {
    console.log("analyseDataInput", "fileLpln", fileLpln);
    console.log("analyseDataInput", "fileVemgsa", fileVemgsa);
    console.log("analyseDataInput", "fileVemgsa.length", fileVemgsa.length);
    console.log("analyseDataInput", "fileVemgsa[0]", fileVemgsa[0]);
    console.log("analyseDataInput", "fileVemgsa[1]", fileVemgsa[1]);
    if (this.isArcid) {
      console.log("analyseDataInput", "this.arcid.value", this.arcid.value);
      this._exchangeService.analyseDataInput(this.arcid.value, 0, fileLpln, fileVemgsa);
    }
    else {
      console.log("analyseDataInput", "this.plnid.value", this.plnid.value);
      this._exchangeService.analyseDataInput("", this.plnid.value, fileLpln, fileVemgsa);
    }
    this.analyseState = true;
  }

  public get isNoFileSelected(): boolean {
    return ((this.selectedLplnFile === undefined) && (this.selectedVemgsaFile === undefined));
  }

  public get isUploadEnable(): boolean {
    return (!this.isNoFileSelected && !this.isUploading);
  }

  /*************************************************  ************************************************/




  /****************************** PARTIE FONCTIONS CHECK INITIAL PAR LE SERVEUR *************************** */
  public get isCheckInital(): boolean {
    return this._exchangeService.getcheckState() === CheckState.CHECK_INI_KO;
  }

  public getErrorInital(): string {
    return this._exchangeService.getcheckInitialResult().messageRetour;
  }

  /*************************************************  ************************************************/

  /****************************** PARTIE FONCTIONS CHECK PAR LE SERVEUR *************************** */
  public get isCheckOK(): boolean {
    return this._exchangeService.getcheckState() === CheckState.CHECK_OK;
  }

  public get isCheckKO(): boolean {
    return this._exchangeService.getcheckState() === CheckState.CHECK_KO;
  }

  public getError(): string {
    return this._exchangeService.getcheckResult().messageRetour;
  }

  public getArcidTrouve(): string {
    return this._exchangeService.getcheckResult().arcid;
  }

  public getPlnidTrouve(): number {
    return this._exchangeService.getcheckResult().plnid;
  }

  /*************************************************  ************************************************/



  /****************************** PARTIE FONCTIONS ANALYSE PAR LE SERVEUR *************************** */


  public analyseFiles(): void {
    console.log("analyseFiles");
    console.log("selectedVemgsaFileName: ", this.vemgsaFilesNames);

    console.log("this.vemgsaFilesNames.length: ", this.vemgsaFilesNames.length);
    let arcid: string = this._exchangeService.getcheckResult().arcid;
    let plnid: number = this._exchangeService.getcheckResult().plnid;
    if (this.selectedLplnFile !== null) {
      this._exchangeService.analyseFiles(arcid, plnid, this.selectedLplnFile.name, this.vemgsaFilesNames);

    }
    else {
      this._exchangeService.analyseFiles(arcid, plnid, "", this.vemgsaFilesNames);

    }
    //this.alerteCanicule.emit(2);
  }

  /*************************************************  ************************************************/


  public get ListeVols(): Array<any> {
    return this._exchangeService.getListeVolsTrouves();
  }

  public getListeArcid(): string[] {
    return this._exchangeService.getListeArcidTrouves();

  }



  /* -- -- */

}



