import { Component, OnInit, ViewChild, EventEmitter, Input } from '@angular/core';
import { ExchangeService } from '../services/exchange.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-page-accueil',
  templateUrl: './page-accueil.component.html',
  styleUrls: ['./page-accueil.component.css']
})
export class PageAccueilComponent {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  public dataSource: MatTableDataSource<UserData>;
  public charge: boolean;

  public displayedColumns: string[] = [ 'entree_date', 'vol_date', 'plnid', 'arcid','select'];


  constructor(private _exchangeService: ExchangeService) {
    this.charge = false;
  }

  public get isDatabase(): boolean {
    return this._exchangeService.getDatabase() !== undefined;
  }
  public loadDatabase() {
    if (this.isDatabase && !this.charge) {
      console.log("chargement database");
      // this.dataSource = new MatTableDataSource<UserData>(test);
      //this.dataSource.paginator = this.paginator;
      this.dataSource = this._exchangeService.getDatabase();
      this.charge = true;
    }
  }

  public get Database() {
    console.log("get database");
    this.loadDatabase();
    return this.dataSource;
  }

  public DownloadVol(row?) {
    console.log("afficherVol");
    console.log("idCompletSelectionne:",row);
    this._exchangeService.getVolFromDatabase(row.id);

  }

}





export interface UserData {
  position: number;
  id: string;
  plnid: string;
  arcid: string;
  entree_date: string;
  vol_date: string;
}
const test: UserData[] = [
  { position: 1, id: '1', plnid: '3421', arcid: "AFR21", entree_date: 'bla', vol_date: 'bla' },
  { position: 2, id: '2', plnid: '3421', arcid: "AFR21", entree_date: 'bla', vol_date: 'bla' },
  { position: 3, id: '3', plnid: '3421', arcid: "AFR21", entree_date: 'bla', vol_date: 'bla' },
  { position: 4, id: '4', plnid: '3421', arcid: "AFR21", entree_date: 'bla', vol_date: 'bla' },
  { position: 5, id: '5', plnid: '3421', arcid: "AFR21", entree_date: 'bla', vol_date: 'bla' },
  { position: 6, id: '6', plnid: '3421', arcid: "AFR21", entree_date: 'bla', vol_date: 'bla' },
  { position: 7, id: '7', plnid: '3421', arcid: "AFR21", entree_date: 'bla', vol_date: 'bla' },
  { position: 8, id: '8', plnid: '3421', arcid: "AFR21", entree_date: 'bla', vol_date: 'bla' },
  { position: 9, id: '9', plnid: '3421', arcid: "AFR21", entree_date: 'bla', vol_date: 'bla' },
  { position: 10, id: '10', plnid: '3421', arcid: "AFR21", entree_date: 'bla', vol_date: 'bla' },
  { position: 11, id: '11', plnid: '3421', arcid: "AFR21", entree_date: 'bla', vol_date: 'bla' },
];

