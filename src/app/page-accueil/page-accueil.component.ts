import { Component, OnInit } from '@angular/core';
import { ExchangeService } from '../services/exchange.service';

@Component({
  selector: 'app-page-accueil',
  templateUrl: './page-accueil.component.html',
  styleUrls: ['./page-accueil.component.css']
})
export class PageAccueilComponent implements OnInit {

  constructor(private _exchangeService: ExchangeService) { }
  displayedColumnsDet: string[] = ['id', 'entree_date', 'vol_date', 'plnid', 'arcid'];

  ngOnInit() {
  }

  public  getDatabase() {
   return this._exchangeService.getDatabase();
  }


}
