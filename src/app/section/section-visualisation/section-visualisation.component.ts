import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UploadService } from 'src/app/services/upload.service';
import { ExchangeService } from 'src/app/services/exchange.service';
import { Vol } from 'src/app/models/vol';
import { GestionVolsService } from 'src/app/services/gestion-vols.service';
import { AnalyseState } from 'src/app/models/AnalyseState';
import { EtatCpdlc } from 'src/app/models/etatCpdlc';


@Component({
    selector: 'app-section-visualisation',
    templateUrl: './section-visualisation.component.html',
    styleUrls: ['./section-visualisation.component.css']
})
export class SectionVisualisationComponent implements OnInit {
    ngOnInit(): void {
        this.volCharge = false;
    }

    constructor(private _gestionVolsService: GestionVolsService) { }

    monvol: Vol;
    dataGenerale: [{ arcid: string, plnid: number }];
    dataDetailMix: EtatCpdlc[];
    dataDetailLpln: EtatCpdlc[];
    dataDetailVemgsa: EtatCpdlc[];
    volCharge: boolean;


    public get isAnalysed(): boolean {
        //  return this._exchangeService.getAnalyseState() === AnalyseState.ANALYSED;
        return this._gestionVolsService.getNbVols() !== 0;
    }

    public get isLpln(): boolean {
        return this.dataDetailLpln !== null;
    }

    public get isVemgsa(): boolean {
        return this.dataDetailVemgsa !== null;
    }

    public get isMix(): boolean {
        return this.dataDetailMix !== null;
    }

    public get isVolCharge(): boolean {
        //  return this._exchangeService.getAnalyseState() === AnalyseState.ANALYSED;
        return this.volCharge === true;
    }


    public getVol() {
        this.monvol = this._gestionVolsService.getVol(0);
        this.dataGenerale = [{ arcid: this.monvol.getArcid(), plnid: this.monvol.getPlnid() },];
        this.dataDetailMix = this.monvol.getListeVolMix();
        this.dataDetailLpln = this.monvol.getListeVolLpln();
        this.dataDetailVemgsa= this.monvol.getListeVolVemgsa();

        for (let nbVol = 0; nbVol < this._gestionVolsService.getNbVols(); nbVol++) {
            const element = this._gestionVolsService.getVol(nbVol);

        }

        setTimeout(() => this.volCharge = true);




    }


    
    ////////////////AFFICHAGE DES LOGS 
    displayedColumnsGen: string[] = ['donnee', 'valeur'];
    displayedColumnsDet: string[] = ['title', 'date', 'heure','etat', 'valeur'];



    alternate: boolean = true;
    toggle: boolean = true;
    color: boolean = true;
    size: number = 40;
    expandEnabled: boolean = true;
    side: string = "left";

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

    public isPositionated(value: number): boolean {
        // console.log("id: ",value);

        if (value / 2 == Math.round(value / 2)) return true;
        else return false;
    }




}
