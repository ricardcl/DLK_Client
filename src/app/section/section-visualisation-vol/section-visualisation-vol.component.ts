import { Component, OnInit, Input } from '@angular/core';
import { Vol } from 'src/app/models/vol';
import { GestionVolsService } from 'src/app/services/gestion-vols.service';
import { EtatCpdlc } from 'src/app/models/etatCpdlc';
import { etatLogonConnexionSimplifiee, etatTransfertFrequence, erreurVol } from 'src/app/models/checkAnswer';


@Component({
    selector: 'app-section-visualisation-vol',
    templateUrl: './section-visualisation-vol.component.html',
    styleUrls: ['./section-visualisation-vol.component.css']
})
export class SectionVisualisationVolComponent implements OnInit {
    ngOnInit(): void {
        console.log("OnInit SectionVisualisationVolComponent");
        this.initComponent();
    }

   
    @Input()
    public monvol: Vol;

    private dataGenerale: [{ arcid: string, plnid: number, adrModeSInf: string, adrDeposee: string, equipementCpdlc: boolean }];
    private volCharge: boolean;
    
    
 

    constructor(private _gestionVolsService: GestionVolsService) { 
    }


    public get isAnalysed(): boolean {
        return this._gestionVolsService.getNbVols() !== 0;
    }

    public get isLpln(): boolean {
        return this.monvol.getListeVolLpln() !== null;
    }

    public get isVemgsa(): boolean {
        return this.monvol.getListeVolVemgsa() !== null;
    }

    public get isMix(): boolean {
        return this.monvol.getListeVolMix() !== null;
    }

    public get isVolCharge(): boolean {
        return this.volCharge === true;
    }

    public get isVolConnecte():boolean {
        return this.monvol.getIsConnexionInitiee() ;
    }


    public initComponent() {
        
        this.dataGenerale = [{
            arcid: this.monvol.getArcid(), plnid: this.monvol.getPlnid(), adrModeSInf: this.monvol.getadrModeSInf(),
            adrDeposee: this.monvol.getadrDeposee(), equipementCpdlc: this.monvol.getEquipementCpdlc()
        },];

        this.volCharge = true
        
    }

   
    public getListeEtatLogonConnexion(): etatLogonConnexionSimplifiee[] {
        return this.monvol.getListeEtatLogonConnexion();
    }

    public getListeEtatTransfertFrequence(): etatTransfertFrequence[] {

        return this.monvol.getListeEtatTransfertFrequence();
    }


    ////////////////AFFICHAGE DES LOGS 
    displayedColumnsGen: string[] = ['donnee', 'valeur', 'adrModeSInf', 'adrDeposee', 'equipementCpdlc'];

    displayedColumnsDet: string[] = ['date', 'heure', 'log', 'etat', 'valeur'];

    displayedColumnsErreurs: string[] = ['date', 'type', 'explication'];

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
