import { Component, ViewChild, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { UploadService } from 'src/app/services/upload.service';
import { ExchangeService } from 'src/app/services/exchange.service';
import { GestionVolsService } from 'src/app/services/gestion-vols.service';
import { Identifiants } from 'src/app/models/identifiants';
import { datesFile } from 'src/app/models/date';




@Component({
  selector: 'app-section-formulaire',
  templateUrl: './section-formulaire.component.html',
  styleUrls: ['./section-formulaire.component.css']
})
export class SectionFormulaireComponent implements OnInit {



  ngOnInit(): void {
    console.log("OnInit SectionFormulaireComponent");

    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['']
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['']
    });
  }


  private selectedLplnFile: File;
  private selectedVemgsaFile: File[];
  private vemgsaFilesNames: string[];
  public plnid: FormControl;
  public arcid: FormControl;




  //attributs pour le stepper
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;


  public initFormulaire(): void {
    console.log("initialisation demandee");
    this.selectedLplnFile = null;
    this.selectedVemgsaFile = [];
    this.vemgsaFilesNames = [];
    this.arcid = new FormControl('', [Validators.required, Validators.pattern(this.regexpArcid)]);
    this.plnid = new FormControl('', [Validators.required, Validators.pattern(this.regexpPlnid)]);
    this.chosenHoraire = '';
    this.validatedHoraire = false;

  }


  constructor(private _chargerFormulaireService: UploadService, private _exchangeService: ExchangeService, private _gestionVolsService: GestionVolsService, private _formBuilder: FormBuilder) {
    console.log("coucou constructor");

    this.initFormulaire();

  }



  private chosenHoraire: string;

  private validatedHoraire: boolean;

  /** PARTIE DU FORMULAIRE POUR LA GESTION DES PLNID/ARCID */
  public identifiantSelectionne: string = 'Plnid';
  public identifiants: string[] = ['Arcid', 'Plnid'];
  private regexpPlnid: RegExp = /^\d{1,4}$/;
  private regexpArcid: RegExp = /^[a-z][a-z|0-9]{1,6}$/i;

  private getErrorMessagePlnid() {
    if (this.plnid.hasError('required')) { return 'Valeur obligatoire'; }
    if (!(this.regexpPlnid.test(this.plnid.value))) { return "format incorrect :un plnid est composé de 1 à 4 chiffres"; }
    return "";
  }

  private getErrorMessageArcid() {
    if (this.arcid.hasError('required')) { return 'Valeur obligatoire'; }
    if (!(this.regexpArcid.test(this.arcid.value))) { return "Format attendu:  6 caracteres max, chiffres ou lettres"; }
    return "";
  }

  public get isArcid(): boolean {
    return this.identifiantSelectionne === this.identifiants[0]
  }

  public get isPlnid(): boolean {
    return this.identifiantSelectionne === this.identifiants[1];
  }

  public get isFileSelected(): boolean {
    return ((this.selectedVemgsaFile.length !== 0) || (this.selectedLplnFile !== null));

  }


  /*************************************************  ************************************************/



  /****************************** PARTIE FONCTIONS  D'UPLOAD *************************** */
  public updateSelectedLpln(file: File): void {
    console.log('updateSelectedLpln ' + file.name);
    this.selectedLplnFile = file;
  }

  public updateSelectedVemgsa(file: File[]): void {
    for (let i = 0; i < file.length; i++) {
      console.log('updateSelectedVemgsa ' + file[i].name);
      this.selectedVemgsaFile.push(file[i]);
      this.vemgsaFilesNames.push(file[i].name);
    }
  }

  public uploadFiles(): void {

    let selectedFile: File[] = [];
    // Copy the array pointer in a local var
    selectedFile = [...this.selectedVemgsaFile];

    if (this.selectedLplnFile != null) {
      selectedFile.push(this.selectedLplnFile);
    }
    console.log("uploadFiles selectedFile", selectedFile);

    this._chargerFormulaireService.uploadFiles(selectedFile);


  }



  public analyseDataInput(): void {


    let lplnFileName: string = "";
    let vemgsaFileName: string[] = this.vemgsaFilesNames;

    if (this.selectedLplnFile !== null) {
      lplnFileName = this.selectedLplnFile.name;
    }

    if (this.isArcid) {

      console.log("analyseDataInput", "this.arcid.value", this.arcid.value);
      this._exchangeService.analyseDataInput(this.arcid.value.toUpperCase(), 0, lplnFileName, vemgsaFileName, this.chosenHoraire);
    }
    else {
      console.log("analyseDataInput", "this.plnid.value", this.plnid.value);
      this._exchangeService.analyseDataInput("", this.plnid.value, lplnFileName, vemgsaFileName, this.chosenHoraire);
    }

    if (this.isHoraireChosen) {
      this.validatedHoraire = true;
    }
  }

  /*************************************************  ************************************************/




  /****************************** PARTIE FONCTIONS CHECK PAR LE SERVEUR *************************** */
  public get isCheckOK(): boolean {
    return (this._exchangeService.getcheckResult().analysePossible);
  }



  public getMessageLPLN(): string {

    let message = "";
    if (this._exchangeService.getcheckResult().checkLPLN !== undefined) {
      let resultLPLN = this._exchangeService.getcheckResult().checkLPLN.valeurRetour;


      switch (resultLPLN) {
        case 0: message = "Vol trouvé";
          break;
        case 1: message = "identifiant non trouvé , les identifiants presents dans ce fichier LPLN sont: "
          this._exchangeService.getcheckResult().checkLPLN.tabId.forEach(element => {
            message = message + "[" + element.arcid + "," + element.plnid + "]";
          });
          break;
        case 2: message = "Format des identifiants fournis incorrect";
          break;
        case 3: message = "Probleme lors de l ouverture du fichier LPLN";
          break;
        default: message = "Erreur analyse LPLN";
          break;
      }
    }

    return message;
  }


  public getMessageVEMGSA(): string {
    let message = "";
    if (this._exchangeService.getcheckResult().checkVEMGSA !== undefined) {


      let resultVEMGSA = this._exchangeService.getcheckResult().checkVEMGSA;

      switch (resultVEMGSA.valeurRetour) {
        case 0: message = "Vol trouvé"
          break;
        case 1: message = "Fichier incomplet : plnid non trouvé" + " plage horaire etudiee = ...";
          break;
        case 2: message = "Fichier incomplet : arcid non trouvé" + " plage horaire etudiee = ...";
          break;
        case 3: message = "Connexion Datalink refusée -> pas de  plnid  associé à l'arcid";
          break;
        case 4: message = "Connexion Datalink refusée ???? -> pas de  arcid  associé au plnid";
          break;
        case 5: message = "Plusieurs creneaux horaires trouvés pour  l'identifiant donné";
          resultVEMGSA.tabHoraires.forEach(element => {
            message = message + "[" + element.dateMin + "," + element.dateMax + "]";
          });
          break;
        case 6: message = "Identifiant fourni non present dans le fichier VEMGSA" + "plage horaire etudiee = [" + resultVEMGSA.datesFichierVemgsa.dateMin + ',' + resultVEMGSA.datesFichierVemgsa.dateMax + ']';
          break;
        case 7: message = "Format des identifiants fournis incorrect";
          break;
        case 8: message = "Probleme lors de l ouverture du fichier VEMGSA";
          break;
        default: message = "Erreur analyse VEMGSA";
          break;
      }
    }

    return message;
  }

  public GetHoraires(): datesFile[] {
    let tabHoraires: datesFile[] = [];
    tabHoraires = this._exchangeService.getcheckResult().checkVEMGSA.tabHoraires;
    return tabHoraires;
  }

  public get isHoraireChosen(): boolean {
    return (this.chosenHoraire !== '');
    //return true;
  }

  public get isVEMGSA(): boolean {
    return (this._exchangeService.getcheckResult().checkVEMGSA !== undefined);
  }

  public get isHorairesVemgsaMultiple(): boolean {
    let result: boolean = false;
    if (this.isVEMGSA) {
      result = (this._exchangeService.getcheckResult().checkVEMGSA.valeurRetour == 5);
    }
    // console.log("isHorairesVemgsaMultiple result", result);

    return result;
  }

  public get isLPLN(): boolean {
    return (this._exchangeService.getcheckResult().checkLPLN !== undefined);
  }

  public getArcidTrouve(): string {
    return this._exchangeService.getcheckResult().arcid;
  }

  public getPlnidTrouve(): number {
    return this._exchangeService.getcheckResult().plnid;
  }

  public identifiantCompletSelectionne: string = '';
  favoriteSeason: string;
  seasons: string[] = ['Winter', 'Spring', 'Summer', 'Autumn'];
  public getListeIdentifiantsTrouves(): Identifiants[] {
    return this._exchangeService.getcheckResult().listeIdentifiants;
  }

  /*************************************************  ************************************************/



  /****************************** PARTIE FONCTIONS ANALYSE PAR LE SERVEUR *************************** */


  public analyseFiles(): void {
    console.log("analyseFiles");
    console.log("selectedVemgsaFileName: ", this.vemgsaFilesNames);

    console.log("this.chosenHoraire", this.chosenHoraire);

    console.log("this.vemgsaFilesNames.length: ", this.vemgsaFilesNames.length);
    let arcid: string = this._exchangeService.getcheckResult().arcid;
    let plnid: number = this._exchangeService.getcheckResult().plnid;
    console.log("arcid", arcid, "plnid", plnid);

    if (this.selectedLplnFile !== null) {
      console.log("this.selectedLplnFile.name: ", this.selectedLplnFile.name);
      this._exchangeService.analyseFiles(arcid, plnid, this.selectedLplnFile.name, this.vemgsaFilesNames, this.chosenHoraire);

    }
    else {
      this._exchangeService.analyseFiles(arcid, plnid, "", this.vemgsaFilesNames, this.chosenHoraire);

    }
    //this.alerteCanicule.emit(2);
  }


  /*************************************************  ************************************************/

  /* -- -- */

}



