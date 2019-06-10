import { Component, OnInit } from '@angular/core';
import { ExchangeService } from 'src/app/services/exchange.service';
import { GestionVolsService } from 'src/app/services/gestion-vols.service';


@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.css']
})
export class SectionComponent implements OnInit {
 private panelOpenState : boolean = false;
  
  constructor( private _gestionVolsService : GestionVolsService) { }

  ngOnInit() {
  }

  public get isAnalysed(): boolean {
    //  return this._exchangeService.getAnalyseState() === AnalyseState.ANALYSED;
    return this._gestionVolsService.getNbVols() !== 0;
}



  


}
