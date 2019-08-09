import { Component, OnInit } from '@angular/core';
import { GestionVolsService } from '../services/gestion-vols.service';
import { Vol } from '../models/vol';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private _gestionVolsService : GestionVolsService) { }

  public getVols () : Vol[] {
    return this._gestionVolsService.getVols();
  }

  ngOnInit() {
  }

}
