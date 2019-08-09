import { Component, OnInit } from '@angular/core';
import { Vol } from 'src/app/models/vol';
import { ParamMap, ActivatedRoute } from '@angular/router';
import { GestionVolsService } from 'src/app/services/gestion-vols.service';

@Component({
  selector: 'app-visu',
  templateUrl: './visu.component.html',
  styleUrls: ['./visu.component.css']
})
export class VisuComponent implements OnInit {
  private componentVol: Vol;

  constructor(private _route: ActivatedRoute, private _gestionVolsService: GestionVolsService) { }

  ngOnInit() {
  }

  public getVol(): Vol {
    return this._gestionVolsService.getVolById(this._route.snapshot.params['id']);
  }

}
