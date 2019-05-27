import { Component } from '@angular/core';
import { NavigationService } from 'src/app/services/navigation.service';
import { ExchangeService } from 'src/app/services/exchange.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'dlk-app';
  //constructor(private formulaireService: ChargerFormulaireService) {
  //}
  constructor(private _navigationService: NavigationService, private _exchangeService: ExchangeService) {

  }

  

  public navigateToAccueil(): void {
    this._exchangeService.setGestionPage(0);
    this._navigationService.navigateToAccueil();
  }

  public navigateToFormulaire(): void {
    this._exchangeService.setGestionPage(1);
    this._navigationService.navigateToAccueil();
  }
  



}
