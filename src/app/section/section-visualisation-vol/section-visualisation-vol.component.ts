import { Component, OnInit, Input } from '@angular/core';
import { Vol } from 'src/app/models/vol';
import { GestionVolsService } from 'src/app/services/gestion-vols.service';
import { EtatCpdlc } from 'src/app/models/etatCpdlc';
import { etatLogonConnexionSimplifiee, etatTransfertFrequence, erreurVol } from 'src/app/models/checkAnswer';
import { inputData } from 'src/app/models/identifiants';


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

    public get isVolConnecte(): boolean {
        return this.monvol.getIsConnexionInitiee();
    }


    public initComponent() {
        this.volCharge = true;
    }


    public getListeEtatLogonConnexion(): etatLogonConnexionSimplifiee[] {
        return this.monvol.getListeEtatLogonConnexion();
    }

    public getListeEtatTransfertFrequence(): etatTransfertFrequence[] {

        return this.monvol.getListeEtatTransfertFrequence();
    }


    ////////////////AFFICHAGE DES LOGS 
    displayedColumnsDet: string[] = ['date', 'heure', 'log', 'etat', 'valeur'];
    displayedColumnsErreurs: string[] = ['date', 'type', 'explication'];




}
