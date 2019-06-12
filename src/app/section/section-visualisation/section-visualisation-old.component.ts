import { Component } from '@angular/core';
import { UploadService } from 'src/app/services/upload.service';
import { ExchangeService } from 'src/app/services/exchange.service';
import { Vol } from 'src/app/models/vol';
import { EtatCpdlc } from 'src/app/models/etatCpdlc';





@Component({
  selector: 'app-section-visualisation',
  templateUrl: './section-visualisation.component.html',
  styleUrls: ['./section-visualisation.component.css']
})
export class SectionVisualisationComponent  {
  displayedColumnsGen: string[] = ['donnee', 'valeur'];
  displayedColumnsDet: string[] = ['title','date','etat', 'valeur'];

  monvol :Vol = this._exchangeService.getVol();
  dataGenerale =  [ {arcid: this.monvol.getArcid(), plnid: this.monvol.getPlnid()},
    //{title: this.monvol.getListeVol()[0].getTitle(),etat: this.monvol.getListeVol()[0].getEtat() }
  ];
 
  dataDetail:  EtatCpdlc[] =   this.monvol.getListeVolMix();
 

  alternate: boolean = true;
  toggle: boolean = true;
  color: boolean = true;
  size: number = 40;
  expandEnabled: boolean = true;
  side:string = "left";

  entries = [
    {
      header: 'header',
      content: 'content'
    }
  ]

  addEntry() {
    this.entries.push({
      header: 'header',
      content: 'content'
    })
  }

  removeEntry() {
    this.entries.pop();
  }

  onHeaderClick(event) {
    if (!this.expandEnabled) {
      event.stopPropagation();
    }
  }

  onDotClick(event) {
    if (!this.expandEnabled) {
      event.stopPropagation();
    }
  }

  onExpandEntry(expanded, index) {
    console.log(`Expand status of entry #${index} changed to ${expanded}`)
  }

  toggleSide() {
    this.side = this.side === 'left' ? 'right' : 'left';
  }

  public  isPositionated (value : number) : boolean {
   // console.log("id: ",value);
    
if (value / 2 == Math.round(value/2)) return true;
else   return false;
  }

  //dataSource = ELEMENT_DATA;
  constructor(private _chargerFormulaireService: UploadService, private _exchangeService: ExchangeService ) { }


}
