import { Component, OnInit } from '@angular/core';
import { UploadService } from '../../services/upload.service';
import {UploaderState} from '../../models/uploaderState';
import {vol} from '../../models/vol';
import {ConnectService} from '../../services/connect.service'

@Component({
  selector: 'app-formulaire',
  templateUrl: './formulaire.component.html',
  styleUrls: ['./formulaire.component.css']
})
export class FormulaireComponent implements OnInit {
  private selectedLplnFile : File;
  private selectedVemgsaFile : File;
  private selected = 'option2';
  //private listeVols = [{"arcid":"DLH37F","plnid":"9352","listeLogs":{},"sl":"AIX"},{"arcid":"DLH37F","plnid":"9352","listeLogs":{},"sl":"AIX"},{"arcid":"DLH37F","plnid":"9352","listeLogs":{},"sl":"AIX"},{"arcid":"DLH37F","plnid":"9352","listeLogs":{},"sl":"AIX"},{"arcid":"DLH37F","plnid":"9352","listeLogs":{},"sl":"AIX"},{"arcid":"DLH72K","plnid":"9317","listeLogs":{},"sl":"AIX"},{"arcid":"DLH72K","plnid":"9317","listeLogs":{},"sl":"AIX"},{"arcid":"DLH72K","plnid":"9317","listeLogs":{},"sl":"AIX"},{"arcid":"DLH72K","plnid":"9317","listeLogs":{},"sl":"AIX"},{"arcid":"DLH72K","plnid":"9317","listeLogs":{},"sl":"AIX"},{"arcid":"CFG4AK","plnid":"1149","listeLogs":{},"sl":"AIX"},{"arcid":"CFG4AK","plnid":"1149","listeLogs":{},"sl":"AIX"},{"arcid":"CFG4AK","plnid":"1149","listeLogs":{},"sl":"AIX"},{"arcid":"CFG4AK","plnid":"1149","listeLogs":{},"sl":"AIX"},{"arcid":"CFG4AK 0","plnid":"1149","listeLogs":{},"sl":"AIX"}]
  private listeVols;

  constructor(private _chargerFormulaireService: UploadService) { 

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


  /* -- -- */


  public analyseFiles (file : string) : void {
    this._chargerFormulaireService.analyseFiles(this.selectedLplnFile.name);

  }

  public listePlnid () : void {
    this.listeVols = this._chargerFormulaireService.getPlnids();
    //console.log("ma liste : "+"\n"+ this.listeVols);
  }



  public get isAnalyseEnable () : boolean {
    this.listePlnid();
    return this._chargerFormulaireService.AnalyseState === UploaderState.IDLE;
  }
}
