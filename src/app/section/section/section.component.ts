import { Component, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { ExchangeService } from 'src/app/services/exchange.service';
import { GestionVolsService } from 'src/app/services/gestion-vols.service';
import { Vol } from 'src/app/models/vol';


@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.css']
})
export class SectionComponent implements OnDestroy, OnChanges, OnInit {
  ngOnInit(): void {
    console.log("OnInit SectionComponent");
    // this._exchangeService.initSocket();
     
   }
 
   ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
     console.log("OnChanges SectionComponent");
   }
 
   ngOnDestroy(): void {
     console.log("OnDestroy SectionComponent");
     
    //this._exchangeService.fermetureSocket();
   }
 private panelOpenState : boolean = false;
  
  constructor(private _exchangeService: ExchangeService,  private _gestionVolsService : GestionVolsService) { }


  public get isAnalysed(): boolean {
    //  return this._exchangeService.getAnalyseState() === AnalyseState.ANALYSED;
    return this._gestionVolsService.getNbVols() !== 0;
}

public hasVol () : boolean {
  return this._gestionVolsService.getNbVols() > 0;
}

public getVol() : Vol {
  return this._gestionVolsService.getVol(0);
}



  


}
