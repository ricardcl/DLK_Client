import { Component, ViewChild, Output, EventEmitter, OnInit } from '@angular/core';
import { UploadService } from 'src/app/services/upload.service';
import { ExchangeService } from 'src/app/services/exchange.service';
import { UploaderState } from 'src/app/models/uploaderState';
import {Vol} from '../../models/vol';
import {ConnectService} from '../../services/connect.service';
import { NavigationService } from 'src/app/services/navigation.service';



@Component({
  selector: 'app-section-formulaire-fichiers',
  templateUrl: './section-formulaire-fichiers.component.html',
  styleUrls: ['./section-formulaire-fichiers.component.css']
})
export class SectionFormulaireFichiersComponent implements OnInit {
  @ViewChild('choseFileForm') choseFileForm; // on fait reference a la variable definie dans le html


  private selectedLplnFile : File;
  private selectedVemgsaFile : File;
  private selectedPlnid : number;
  private analyseState : boolean = false;
  private vemgsaFilesNames : string[] = [];


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
    return this._exchangeService.getListeVolsTrouves();
  }


  /* -- -- */


  public get isAnalyzed () : boolean {
    return this.analyseState;
  }

  public analysePlnId (file : File) : void {
    console.log("analyseFilesPlnid", "file", file.name);
    this._exchangeService.analysePlnId(file.name);
    this.analyseState = true;
  }

  public analyseFiles () : void {  
    console.log("analyseFiles");
    console.log("selectedVemgsaFileName: ", this.selectedVemgsaFile.name);
    this.vemgsaFilesNames.push(this.selectedVemgsaFile.name);

    console.log("this.vemgsaFilesNames[0]: ", this.vemgsaFilesNames[0]);
    this._exchangeService.analyseFiles(this.selectedPlnid, this.selectedLplnFile.name,  this.vemgsaFilesNames);
    //this._navigationService.navigateToVisualisation();
  }

  
  ngOnInit() {
   // this._exchangeService.testJson();
  }

}
 
