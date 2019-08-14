import { Component, OnInit, Input } from '@angular/core';
import { Vol } from 'src/app/models/vol';
import { GestionVolsService } from 'src/app/services/gestion-vols.service';
import { EtatCpdlc } from 'src/app/models/etatCpdlc';


@Component({
    selector: 'app-section-visualisation',
    templateUrl: './section-visualisation.component.html',
    styleUrls: ['./section-visualisation.component.css']
})
export class SectionVisualisationComponent implements OnInit {
    ngOnInit(): void {
        console.log("OnInit SectionVisualisationComponent");
        this.volCharge = false;
        this.initComponent();
    }

    constructor(private _gestionVolsService: GestionVolsService) { }
    @Input()
    public monvol: Vol;

    private dataGenerale: [{ arcid: string, plnid: number, adrModeSInf:string, adrDeposee:string , equipementCpdlc:string }];
    private dataDetailMix: EtatCpdlc[];
    private dataDetailLpln: EtatCpdlc[];
    private dataDetailVemgsa: EtatCpdlc[];
    private  volCharge: boolean;


    public get isAnalysed(): boolean {
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
        return this.volCharge === true;
    }


    public initComponent() {
        this.dataGenerale = [{ arcid: this.monvol.getArcid(), plnid: this.monvol.getPlnid(),adrModeSInf: this.monvol.getadrModeSInf(), 
            adrDeposee: this.monvol.getadrDeposee(), equipementCpdlc: this.monvol.getEquipementCpdlc() },];

        this.dataDetailMix = this.monvol.getListeVolMix();
        this.dataDetailLpln = this.monvol.getListeVolLpln();
        this.dataDetailVemgsa= this.monvol.getListeVolVemgsa();

        this.volCharge = true
    }


    
    ////////////////AFFICHAGE DES LOGS 
    displayedColumnsGen: string[] = ['donnee', 'valeur', 'adrModeSInf', 'adrDeposee', 'equipementCpdlc' ];

    displayedColumnsDet: string[] = ['date', 'heure', 'title', 'etat'];



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
