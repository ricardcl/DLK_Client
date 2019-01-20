import { Component, OnInit } from '@angular/core';
import { UploadService } from '../../services/upload.service';
import {UploaderState} from '../../models/uploaderState';
import {vol} from '../../models/vol';
import {ConnectService} from '../../services/connect.service'
import { ExchangeService } from 'src/app/services/exchange.service';

@Component({
  selector: 'app-formulaire',
  templateUrl: './formulaire.component.html',
  styleUrls: ['./formulaire.component.css']
})
export class FormulaireComponent implements OnInit {
  private selectedLplnFile : File;
  private selectedVemgsaFile : File;

  constructor(private _chargerFormulaireService: UploadService,private _exchangeService: ExchangeService ) { 

  }

  ngOnInit() {

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
  }

  public updateSelectedVemgsa (file : File) : void {
    console.log('hello' + file.name);
    this.selectedVemgsaFile = file;
  }
  
  public uploadFiles () : void {
    this._chargerFormulaireService.uploadFiles([this.selectedLplnFile, this.selectedVemgsaFile]);
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


  public analyseFiles (file : string) : void {
    console.log("analyseFiles", file, this.selectedLplnFile.name);
    this._exchangeService.analyseFiles(this.selectedLplnFile.name);

  }

}
