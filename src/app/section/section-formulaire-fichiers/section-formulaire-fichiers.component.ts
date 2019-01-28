import { Component } from '@angular/core';
import { UploadService } from 'src/app/services/upload.service';
import { ExchangeService } from 'src/app/services/exchange.service';
import { UploaderState } from 'src/app/models/uploaderState';
import {vol} from '../../models/vol';
import {ConnectService} from '../../services/connect.service';


@Component({
  selector: 'app-section-formulaire-fichiers',
  templateUrl: './section-formulaire-fichiers.component.html',
  styleUrls: ['./section-formulaire-fichiers.component.css']
})
export class SectionFormulaireFichiersComponent  {

  private selectedLplnFile : File;
  private selectedVemgsaFile : File;


constructor(private _chargerFormulaireService: UploadService,private _exchangeService: ExchangeService ) { 

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
