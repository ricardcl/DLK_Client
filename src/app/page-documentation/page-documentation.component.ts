import { Component, OnInit } from '@angular/core';
import { ExchangeService } from '../services/exchange.service';

@Component({
  selector: 'app-page-documentation',
  templateUrl: './page-documentation.component.html',
  styleUrls: ['./page-documentation.component.css']
})
export class PageDocumentationComponent implements OnInit {

  
  constructor(private _exchangeService: ExchangeService) {
      }

  ngOnInit() {
  }
  public panelOpenState: boolean[]  =  [false,false,false];
 

  public togglePanel(numPanel:number) {
    this.panelOpenState[numPanel] = !this.panelOpenState[numPanel]
    console.log("panelOpenState", this.panelOpenState);

  }
  public DownloadVol(id) {
    console.log("afficherVol");
    console.log("idCompletSelectionne:",id);
    this._exchangeService.getVolFromDatabase(id);
  }
}
