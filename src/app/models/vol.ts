import { EtatCpdlc } from './etatCpdlc';
import { etatTransfertFrequence, etatLogonConnexionSimplifiee, erreurVol } from './checkAnswer';
import * as moment from 'moment';
import { inputData } from './identifiants';


export class Vol {
    /** identifiant unique d'un vol (heure en ms ?) */
    private id: string;
    /** identifiant echange entre le serveur air et le STPV pour designer un vol */
    private reqid: number;
    /**Identifiant du vol (code OACI ?) */
    private arcid: string;
    /**Identifiant plan de vol (numero cautra) */
    private plnid: number;
    /**nom du secteur logique traverse */
    private sl: string;
    /**Aeroport de depart*/
    private adep: string;
    /**Aeroport de destination*/
    private ades: string;
    /**Date du vol */
    private date: string;
    /*liste des logs Mix concernant le vol */
    private listeLogsMix: EtatCpdlc[];
    /*liste des logs Lpln concernant le vol */
    private listeLogsLpln: EtatCpdlc[];
    /*liste des logs Vemgsa concernant le vol */
    private listeLogsVemgsa: EtatCpdlc[];
    /*Presence de logs CPDLC */
    private haslogCpdlc: boolean;
    /*Presence de logs CPDLC complets */
    private islogCpdlcComplete: boolean;
    /*etat des differents transferts de frequence*/
    private listeEtatLogonConnexion: etatLogonConnexionSimplifiee[];
    /*etat des differents transferts de frequence*/
    private listeEtatTransfertFrequence: etatTransfertFrequence[];

    // PARAMETRES LIES AU LOGON
    /**Adresse  Mode S vide si route ifps = NON ... inutile a traiter -> a supprimer */
    private adrModeS: string;
    /**Adresse Mode S envoyee par l'equipement bord */
    private adrModeSInf: string;
    /**Adresse deposee par le pilote dans son plan de vol */
    private adrDeposee: string;
    /**Indique si le vol est declare equipe cpdlc */
    private equipementCpdlc: boolean;
    /**Reception d'une demande de logon */
    private logonInitie: boolean;
    /**Acceptation du logon par le STPV*/
    private logonAccepte: boolean;

    /**adrDeposee et cmpAdrModeSInf identique (entre Lpln et Vemgsa)  */
    private cmpAdrModeS: boolean;
    /**adep identique entre Lpln et Vemgsa  */
    private cmpAdep: boolean;
    /**ades identique entre Lpln et Vemgsa  */
    private cmpAdes: boolean;
    /**arcid identique entre Lpln et Vemgsa  */
    private cmpArcid: boolean;
    /**conditions du logon remplies/ logon effectue  */
    private conditionsLogon: boolean;
    /** */

    // PARAMETRES LIES A LA CONNEXION
    /**Connexion initiee par le STPV vers l aeronef  */
    private isConnexionInitiee: boolean;
    /**Connexion etablie vers l aeronef  */
    private isConnexionEtablie: boolean;
    /**Perte de connexion avec l aeronef  */
    private isConnexionPerdue: boolean;

    /**Attributs utilisés côté client */
    private listeErreurs: erreurVol[];
    private inputData: inputData;



    private listeEtatTransfertFrequenceModifie: etatTransfertFrequence[];


    constructor(id: string, arcid: string, plnid: number, sl: string, adep: string, ades: string, date: string, adrModeSInf: string, adrDeposee: string, equipementCpdlc: boolean,
        logonInitie: boolean, logonAccepte: boolean, isConnexionInitiee: boolean, isConnexionEtablie: boolean, isConnexionPerdue: boolean, cmpAdrModeS: boolean, cmpAdep: boolean, cmpAdes: boolean, cmpArcid: boolean,
        conditionsLogon: boolean, haslogCpdlc: boolean, islogCpdlcComplete: boolean, listeEtatLogonConnexion: etatLogonConnexionSimplifiee[], listeEtatTransfertFrequence: etatTransfertFrequence[], listeLogsLpln: EtatCpdlc[],
         listeLogsVemgsa: EtatCpdlc[], listeLogsMix: EtatCpdlc[], listeErreurs: erreurVol[], inputData:inputData) {
        this.id = id;
        this.arcid = arcid;
        this.plnid = plnid;
        this.sl = sl;
        this.adep = adep;
        this.ades = ades;
        this.date = date;
        this.adrModeSInf = adrModeSInf;
        this.adrDeposee = adrDeposee;
        this.equipementCpdlc = equipementCpdlc;
        this.logonInitie = logonInitie;
        this.logonAccepte = logonAccepte;
        this.isConnexionInitiee = isConnexionInitiee;
        this.isConnexionEtablie = isConnexionEtablie;
        this.isConnexionPerdue = isConnexionPerdue;
        this.cmpAdrModeS = cmpAdrModeS;
        this.cmpAdep = cmpAdep;
        this.cmpAdes = cmpAdes;
        this.cmpArcid = cmpArcid;
        this.conditionsLogon = conditionsLogon;
        this.haslogCpdlc = haslogCpdlc;
        this.islogCpdlcComplete = islogCpdlcComplete;
        this.listeEtatLogonConnexion = listeEtatLogonConnexion;
        this.listeEtatTransfertFrequence = listeEtatTransfertFrequence;
        this.listeLogsLpln = listeLogsLpln;
        this.listeLogsVemgsa = listeLogsVemgsa;
        this.listeLogsMix = listeLogsMix;
        this.listeErreurs = listeErreurs;
        this.inputData=inputData;
        this.listeEtatTransfertFrequenceModifie = [];

    }


    public setReqid(vol: Vol, reqid: number): void {
        vol.reqid = reqid;
    }
    public setSL(sl: string): void {
        this.sl = sl;
    }

    public setadrModeSInf(adrModeSInf: string): void {
        this.adrModeSInf = adrModeSInf;
    }

    public setadrDeposee(adrDeposee: string): void {
        this.adrDeposee = adrDeposee;
    }

    public setEquipementCpdlc(equipementCpdlc: boolean): void {
        this.equipementCpdlc = equipementCpdlc;
    }


    public setAdep(adep: string): void {
        this.adep = adep;
    }

    public setAdes(ades: string): void {
        this.ades = ades;
    }

    public setLogonInitie(logonInitie: boolean): void {
        this.logonInitie = logonInitie;
    }

    public setLogonAccepte(logonAccepte: boolean): void {
        this.logonAccepte = logonAccepte;
    }

    public setIsConnexionInitiee(isConnexionInitiee: boolean): void {
        this.isConnexionInitiee = isConnexionInitiee;
    }

    public setIsConnexionEtablie(isConnexionEtablie: boolean): void {
        this.isConnexionEtablie = isConnexionEtablie;
    }

    public setIsConnexionPerdue(isConnexionPerdue: boolean): void {
        this.isConnexionPerdue = isConnexionPerdue;
    }

    public setArcid(arcid: string): void {
        this.arcid = arcid;
    }

    public setCmpAdrModeS(cmpAdrModeS: boolean): void {
        this.cmpAdrModeS = cmpAdrModeS;
    }

    public setCmpAdep(cmpAdep: boolean): void {
        this.cmpAdep = cmpAdep;
    }

    public setCmpAdes(cmpAdes: boolean): void {
        this.cmpAdes = cmpAdes;
    }

    public setDate(date: string): void {
        this.date = date;
    }

    public setCmpArcid(cmpArcid: boolean): void {
        this.cmpArcid = cmpArcid;
    }

    public setConditionsLogon(conditionsLogon: boolean): void {
        this.conditionsLogon = conditionsLogon;
    }

    public setHaslogCpdlc(haslogCpdlc: boolean): void {
        this.haslogCpdlc = haslogCpdlc;
    }
    public setIslogCpdlcComplete(islogCpdlcComplete: boolean): void {
        this.islogCpdlcComplete = islogCpdlcComplete;
    }

    public setListeEtatTransfertFrequence(listeEtatTransfertFrequence: etatTransfertFrequence[]): void {
        this.listeEtatTransfertFrequence = listeEtatTransfertFrequence;
    }
    public setListeEtatLogonConnexion(listeEtatLogonConnexion: etatLogonConnexionSimplifiee[]): void {
        this.listeEtatLogonConnexion = listeEtatLogonConnexion;
    }

    public addListeErreurs(erreur: erreurVol): void {
        this.listeErreurs.push(erreur);
    }

    /**
 * Unique ID for a vol
 */
    public getId(): string {
        // TODO : Claire. A faire coté server en donnant l'heure en MS à la fin du traitement
        return this.id;
    }


    public getArcid(): string {
        return this.arcid;
    }

    public getPlnid(): number {
        return this.plnid;
    }

    public getadrModeSInf(): string {
        return this.adrModeSInf;
    }

    public getadrDeposee(): string {
        return this.adrDeposee;
    }
    public getEquipementCpdlc(): boolean {
        return this.equipementCpdlc;
    }


    public getAdep(): string {
        return this.adep;
    }

    public getAdes(): string {
        return this.ades;
    }

    public getDate(): string {
        return this.date;
    }

    public getLogonInitie(): boolean {
        
        return this.logonInitie;
    }

    public getLogonAccepte(): boolean {
        return this.logonAccepte;
    }

    public getIsConnexionInitiee(): boolean {
        return this.isConnexionInitiee;
    }

    public getIsConnexionEtablie(): boolean {
        return this.isConnexionEtablie;
    }

    public getIsConnexionPerdue(): boolean {
        return this.isConnexionPerdue;
    }

    public getCmpAdrModeS(): boolean {
        return this.cmpAdrModeS;
    }

    public getCmpAdep(): boolean {
        return this.cmpAdep;
    }

    public getCmpAdes(): boolean {
        return this.cmpAdes;
    }

    public getCmpArcid(): boolean {
        return this.cmpArcid;
    }

    public getConditionsLogon(): boolean {
        return this.conditionsLogon;
    }

    public getHaslogCpdlc(): boolean {
        return this.haslogCpdlc;
    }
    public getIslogCpdlcComplete(): boolean {
        return this.islogCpdlcComplete;
    }
    public getListeEtatTransfertFrequence(): etatTransfertFrequence[] {
        return this.listeEtatTransfertFrequence;
    }
    public getListeEtatLogonConnexion(): etatLogonConnexionSimplifiee[] {
        return this.listeEtatLogonConnexion;
    }



    public getListeVolLpln(): EtatCpdlc[] {
        return this.listeLogsLpln;
    }
    public getListeVolVemgsa(): EtatCpdlc[] {
        return this.listeLogsVemgsa;
    }
    public getListeVolMix(): EtatCpdlc[] {
        return this.listeLogsMix;
    }

    public getListeErreurs(): erreurVol[] {
        return this.listeErreurs;
    }

    public getInputData(): inputData {
        return this.inputData;
    }

    /**
     * Fonction permettant de recuperer uniquement l'heure des dates de transfert 
     * pour un meilleur affichage dans l'onglet "info générales"
     */
    public getListeEtatTransfertFrequenceModifie(): etatTransfertFrequence[] {


        this.listeEtatTransfertFrequenceModifie = JSON.parse(JSON.stringify(this.listeEtatTransfertFrequence));

        this.listeEtatTransfertFrequenceModifie.forEach(element => {
            if (element.dateTransfert !== undefined) {
                element.dateTransfert = moment(element.dateTransfert, 'DD-MM HH mm ss').format('HH mm ss');
            }
            if (element.dateFinTRFDL !== undefined) {
                element.dateFinTRFDL = moment(element.dateFinTRFDL, 'DD-MM HH mm ss').format('HH mm ss');
            }
            if (element.dateTRARTV !== undefined) {
                element.dateTRARTV = moment(element.dateTRARTV, 'DD-MM HH mm ss').format('HH mm ss');
            }
            if (element.dateTranfertAcq !== undefined) {
                element.dateTranfertAcq = moment(element.dateTranfertAcq, 'DD-MM HH mm ss').format('HH mm ss');
            }

        });
        return this.listeEtatTransfertFrequenceModifie;
    }

}


