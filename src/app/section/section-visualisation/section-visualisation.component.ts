import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UploadService } from 'src/app/services/upload.service';
import { ExchangeService } from 'src/app/services/exchange.service';
import { Vol } from 'src/app/models/vol';
import { GestionVolsService } from 'src/app/services/gestion-vols.service';


@Component({
    selector: 'app-section-visualisation',
    templateUrl: './section-visualisation.component.html',
    styleUrls: ['./section-visualisation.component.css']
})
export class SectionVisualisationComponent {

    constructor(private _chargerFormulaireService: UploadService, private _exchangeService: ExchangeService, private _gestionVolsService : GestionVolsService) { }
   
    monvol :Vol = this._exchangeService.getVol();
  // valeurTest : number = this._gestionVolsService.getTest();

    tabs = ['First', 'Second', 'Third'];
    selected = new FormControl(0);

    addTab(selectAfterAdding: boolean) {
        this.tabs.push('New');

        if (selectAfterAdding) {
            this.selected.setValue(this.tabs.length - 1);
        }
    }

    removeTab(index: number) {
        this.tabs.splice(index, 1);
    }

    



}
