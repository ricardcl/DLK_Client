import { Component, OnInit } from '@angular/core';
import { ChargerFormulaireService } from '../charger-formulaire.service';

@Component({
  selector: 'app-formulaire',
  templateUrl: './formulaire.component.html',
  styleUrls: ['./formulaire.component.css']
})
export class FormulaireComponent implements OnInit {
  private selectedLplnFile : File;
  private selectedVemgsaFile : File;
  
  constructor( private _chargerFormulaireService: ChargerFormulaireService) { 

  }

  ngOnInit() {

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

  


}
