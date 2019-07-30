import { EtatCpdlc } from './etatCpdlc';

export class Vol {
    /** identifiant echange entre le serveur air et le STPV pour designer un vol */
    private reqid: number;
    /**Identifiant du vol (code OACI ?) */
    private arcid: string;
    /**Identifiant plan de vol (numero cautra) */
    private plnid: number;
    /**nom du secteur logique traverse */
    private sl: string;
    /**Adresse Mode S envoyee par l'equipement bord */
    private adrModeSInf: string;
    /**Adresse deposee par le pilote dans son plan de vol */
    private adrDeposee: string;
    /**Indique si le vol est declare equipe cpdlc */
    private equipementCpdlc: string;
    /*liste des logs Mix concernant le vol */
    private listeLogsMix: EtatCpdlc[];
    /*liste des logs Lpln concernant le vol */
    private listeLogsLpln: EtatCpdlc[];
    /*liste des logs Vemgsa concernant le vol */
    private listeLogsVemgsa: EtatCpdlc[];

    constructor(arcid: string, plnid: number, sl: string, adrModeSInf: string, adrDeposee: string,equipementCpdlc:string,  listeLogsLpln: EtatCpdlc[], listeLogsVemgsa: EtatCpdlc[], listeLogsMix: EtatCpdlc[]) {
        this.arcid = arcid;
        this.plnid = plnid;
        this.sl = sl;
        this.adrModeSInf = adrModeSInf;
        this.adrDeposee = adrDeposee;
        this.equipementCpdlc = equipementCpdlc;
        this.listeLogsLpln = listeLogsLpln;
        this.listeLogsVemgsa = listeLogsVemgsa;
        this.listeLogsMix = listeLogsMix;
    }


    public setArcid(arcid: string): void {
        this.arcid = arcid;
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

    public setEquipementCpdlc(equipementCpdlc: string): void {
        this.equipementCpdlc = equipementCpdlc;
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
    public getEquipementCpdlc(): string {
        return this.equipementCpdlc;
    }
    public getVol(vol: Vol): string {
        console.log(vol.reqid);
        return "InfosVol :  " + vol.reqid;
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
}
