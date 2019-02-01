import { Component, ViewChild } from '@angular/core';
import { UploadService } from 'src/app/services/upload.service';
import { ExchangeService } from 'src/app/services/exchange.service';
import { UploaderState } from 'src/app/models/uploaderState';
import {vol} from '../../models/vol';
import {ConnectService} from '../../services/connect.service';
import { NavigationService } from 'src/app/services/navigation.service';


@Component({
  selector: 'app-section-formulaire-fichiers',
  templateUrl: './section-formulaire-fichiers.component.html',
  styleUrls: ['./section-formulaire-fichiers.component.css']
})
export class SectionFormulaireFichiersComponent  {
  @ViewChild('choseFileForm') choseFileForm; // on fait reference a la variable definie dans le html

  private selectedLplnFile : File;
  private selectedVemgsaFile : File;
  private analyseState : boolean = false;


constructor(private _chargerFormulaireService: UploadService,private _exchangeService: ExchangeService, private _navigationService: NavigationService ) { 

  }
 
  /* -- Upload functions -- */
  public get isUploading () : boolean {
    return this._chargerFormulaireService.UploaderState === UploaderState.UPLOADING;
  }

  public get isUploaded () : boolean {
    return this._chargerFormulaireService.UploaderState === UploaderState.IDLE;
  }


  public updateSelectedLpln (file : File) : void {
    console.log('hello' + file.name);
    this.selectedLplnFile = file;
    this.analyseState = false;
  }

 public updateSelectedVemgsa (file : File) : void {
    console.log('hello' + file.name);
    this.selectedVemgsaFile = file;
    this.analyseState = false;
  }
  
  public uploadFiles () : void {
    /** console.log('type lpln' + typeof this.selectedLplnFile);
    console.log('lpln' + this.selectedLplnFile.name);
    console.log('type vemgsa' + typeof this.selectedVemgsaFile);
    console.log('vemgsa' + this.selectedVemgsaFile.name);*/
    this._chargerFormulaireService.uploadFiles([this.selectedLplnFile, this.selectedVemgsaFile]);
    this.analysePlnId(this.selectedLplnFile);
  }
  /* -- -- */

  public get isNoFileSelected () : boolean {
    return ((this.selectedLplnFile === undefined) && (this.selectedVemgsaFile === undefined)) ;
  }

  public get isUploadEnable () : boolean {
    return ( !this.isNoFileSelected && !this.isUploading );
  }

  public get ListeVols () : Array<any> {
    return this._exchangeService.getListeVols();
  }


  /* -- -- */


  public get isAnalyzed () : boolean {
    return this.analyseState;
  }

  public analysePlnId (file : File) : void {
    console.log("analyseFiles", "file", file.name);
    this._exchangeService.analyseFiles(file.name);
    this.analyseState = true;
  }


  public navigateToVisualisation(){
    this._navigationService.navigateToVisualisation();
  }
}
 
