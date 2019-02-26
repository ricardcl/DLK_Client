import { Component } from '@angular/core';
import { UploadService } from 'src/app/services/upload.service';
import { ExchangeService } from 'src/app/services/exchange.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { Vol } from 'src/app/models/vol';
import { EtatCpdlc } from 'src/app/models/etatCpdlc';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

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
 
  dataDetail:  EtatCpdlc[] =   this.monvol.getListeVol();
 

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
  constructor(private _chargerFormulaireService: UploadService, private _exchangeService: ExchangeService, private _navigationService: NavigationService ) { }


}

