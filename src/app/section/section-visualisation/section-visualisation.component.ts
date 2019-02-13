import { Component } from '@angular/core';
import { UploadService } from 'src/app/services/upload.service';
import { ExchangeService } from 'src/app/services/exchange.service';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-section-visualisation',
  templateUrl: './section-visualisation.component.html',
  styleUrls: ['./section-visualisation.component.css']
})
export class SectionVisualisationComponent  {
  

  constructor(private _chargerFormulaireService: UploadService, private _exchangeService: ExchangeService, private _navigationService: NavigationService ) { }

 public get ListEtats () : Array<any> {
   //console.log(" visu donnes recuperes : ",this._exchangeService.getListEtats());
   //console.log(" visu JSONvdonnes recuperes : ",JSON.stringify(this._exchangeService.getListEtats()));
   
    return this._exchangeService.getListEtats();
  }
 

}
