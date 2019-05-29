import { Component } from '@angular/core';
import { ExchangeService } from 'src/app/services/exchange.service';

@Component({
  selector: 'app-section-formulaire',
  templateUrl: './section-formulaire.component.html',
  styleUrls: ['./section-formulaire.component.css']
})
export class SectionFormulaireComponent {

  constructor(private _exchangeService : ExchangeService) { 
   // this._exchangeService.initExchange();
  }



}
