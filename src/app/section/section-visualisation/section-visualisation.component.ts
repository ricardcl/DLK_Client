import { Component, OnInit } from '@angular/core';
import { Vol } from 'src/app/models/vol';
import { ActivatedRoute } from '@angular/router';
import { GestionVolsService } from 'src/app/services/gestion-vols.service';

@Component({
  selector: 'app-section-visualisation',
  templateUrl: './section-visualisation.component.html',
  styleUrls: ['./section-visualisation.component.css']
})
export class SectionVisualisationComponent implements OnInit {

  constructor(private _route: ActivatedRoute, private _gestionVolsService: GestionVolsService) { }

  ngOnInit() {
  }

  public isVolExisting(): boolean {
    return this.getVol() !== undefined;
  }

  public getVol(): Vol {
    return this._gestionVolsService.getVolById(this._route.snapshot.params['id']);
  }

}
