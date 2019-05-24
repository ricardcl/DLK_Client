import { Component, OnInit } from '@angular/core';
import { NavigationService } from 'src/app/services/navigation.service';
import { ExchangeService } from 'src/app/services/exchange.service';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.css']
})
export class SectionComponent implements OnInit {

  
  constructor(private _exchangeService: ExchangeService) { }

  ngOnInit() {
  }


  public get afficherFormulaire(): boolean {
    return this._exchangeService.getGestionPage() === 1;
  }

  public get afficherVisualisation(): boolean {
    return this._exchangeService.getGestionPage() === 2;
  }

  public get retourAccueil(): boolean {
    return this._exchangeService.getGestionPage() === 0;
  }



  


}
