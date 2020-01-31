import { Component, OnInit } from '@angular/core';
import { ExchangeService } from '../services/exchange.service';

@Component({
  selector: 'app-page-accueil',
  templateUrl: './page-accueil.component.html',
  styleUrls: ['./page-accueil.component.css']
})
export class PageAccueilComponent implements OnInit {

    
  public displayedColumnsDet: string[] = ['select','id', 'entree_date', 'vol_date', 'plnid', 'arcid'];
  public idCompletSelectionne;

    constructor(private _exchangeService: ExchangeService) { 
      this.idCompletSelectionne=null;
    }


  ngOnInit() {
  }

  public  getDatabase() {
   // console.log("Accueil getDatabase",this._exchangeService.getDatabase());
   return this._exchangeService.getDatabase();
  }

  public selectionIdVol(row?) {
    this.idCompletSelectionne = row;
    console.log("idCompletSelectionne:", this.idCompletSelectionne);

  }
  public get isVolSelected(): boolean {    
    return (this.idCompletSelectionne !== null);

  }
  
  public afficherVol(): void {
    console.log("afficherVol");
    console.log("selectedIdVol: ", this.idCompletSelectionne);
 
      this._exchangeService.getVolFromDatabase(this.idCompletSelectionne.id);

  }
}
