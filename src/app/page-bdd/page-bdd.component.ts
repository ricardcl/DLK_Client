import { Component, OnInit, ViewChild} from '@angular/core';
import { ExchangeService } from '../services/exchange.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { interfaceBdd } from '../models/checkAnswer';


@Component({
  selector: 'app-page-bdd',
  templateUrl: './page-bdd.component.html',
  styleUrls: ['./page-bdd.component.css']
})
export class PageBddComponent implements OnInit{
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  ngOnInit() {
    setTimeout(()=>{
      this.dataSource = new MatTableDataSource(this._exchangeService.getDatabase());
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, 2000);
    this.dataSource = new MatTableDataSource(this._exchangeService.getDatabase());
 //   this.dataSource.filterPredicate =  (data: interfaceBdd, filter: string) => data.arcid.trim().toLowerCase().indexOf(filter) != -1;
 // (data: Element, filter: string) => data.name.indexOf(filter) != -1;

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  public dataSource: MatTableDataSource<interfaceBdd>;

  public displayedColumns: string[] = [ 'entree_date', 'vol_date', 'plnid', 'arcid','contexte','select'];


  constructor(private _exchangeService: ExchangeService) {
    this.dataSource = new MatTableDataSource([]);
  }

  public get isDatabase(): boolean {
    return this._exchangeService.getDatabase() !== undefined;
  }


  public get Database() {
    console.log("get database");
    return this.dataSource;
  }

  public DownloadVol(row?) {
    console.log("afficherVol");
    console.log("idCompletSelectionne:",row);
    this._exchangeService.getVolFromDatabase(row.id);
  }

  public filtre(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
