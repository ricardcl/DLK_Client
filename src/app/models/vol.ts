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
    /**Aeroport de depart*/
    private adep: string;
    /**Aeroport de destination*/
    private ades: string;
    /*liste des logs Mix concernant le vol */
    private listeLogsMix: EtatCpdlc[];
    /*liste des logs Lpln concernant le vol */
    private listeLogsLpln: EtatCpdlc[];
    /*liste des logs Vemgsa concernant le vol */
    private listeLogsVemgsa: EtatCpdlc[];

    // PARAMETRES LIES AU LOGON
    /**Adresse  Mode S vide si route ifps = NON ... inutile a traiter -> a supprimer */
    private adrModeS: string;
    /**Adresse Mode S envoyee par l'equipement bord */
    private adrModeSInf: string;
    /**Adresse deposee par le pilote dans son plan de vol */
    private adrDeposee: string;
    /**Indique si le vol est declare equipe cpdlc */
    private equipementCpdlc: string;
    /**Reception d'une demande de logon */
    private logonInitie: string;
    /**Acceptation du logon par le STPV*/
    private logonAccepte: string;
    /**adrDeposee et cmpAdrModeSInf identique (entre Lpln et Vemgsa)  */
    private cmpAdrModeS: string;
    /**adep identique entre Lpln et Vemgsa  */
    private cmpAdep: string;
    /**ades identique entre Lpln et Vemgsa  */
    private cmpAdes: string;
    /**arcid identique entre Lpln et Vemgsa  */
    private cmpArcid: string;
    /**conditions du logon remplies/ logon effectue  */
    private conditionsLogon: string;
    /** */
    constructor(arcid: string, plnid: number, sl: string,adep:string, ades:string, adrModeSInf: string, adrDeposee: string, equipementCpdlc: string,
        logonInitie: string,logonAccepte: string,cmpAdrModeS: string, cmpAdep: string,cmpAdes: string, cmpArcid: string, 
        conditionsLogon: string,   listeLogsLpln: EtatCpdlc[], listeLogsVemgsa: EtatCpdlc[], listeLogsMix: EtatCpdlc[]) {
        this.arcid = arcid;
        this.plnid = plnid;
        this.sl = sl;
        this.adep = adep;
        this.ades = ades ;
        this.adrModeSInf = adrModeSInf;
        this.adrDeposee = adrDeposee;
        this.equipementCpdlc = equipementCpdlc;
         this.logonInitie = logonInitie ;   
         this.logonAccepte = logonAccepte ;  
         this.cmpAdrModeS = cmpAdrModeS ;  
         this.cmpAdep = cmpAdep ;  
         this.cmpAdes =  cmpAdes ;  
         this.cmpArcid = cmpArcid ;  
         this.conditionsLogon = conditionsLogon ;  
        this.listeLogsLpln = listeLogsLpln;
        this.listeLogsVemgsa = listeLogsVemgsa;
        this.listeLogsMix = listeLogsMix;
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


    public setAdep(adep: string): void {
        this.adep = adep;
    }

    public setAdes(ades: string): void {
        this.ades = ades;
    }

    public setLogonInitie(logonInitie: string): void {
        this.logonInitie = logonInitie;
    }

    public setLogonAccepte(logonAccepte: string): void {
        this.logonAccepte = logonAccepte;
    }
    public setArcid(arcid: string): void {
        this.arcid = arcid;
    }

    public setCmpAdrModeS(cmpAdrModeS: string): void {
        this.cmpAdrModeS = cmpAdrModeS;
    }

    public setCmpAdep(cmpAdep: string): void {
        this.cmpAdep = cmpAdep;
    }

    public setCmpAdes(cmpAdes: string): void {
        this.cmpAdes = cmpAdes;
    }

    public setCmpArcid(cmpArcid: string): void {
        this.cmpArcid = cmpArcid;
    }

    public setConditionsLogon(conditionsLogon: string): void {
        this.conditionsLogon = conditionsLogon;
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

    
    public getAdep(): string {
        return this.adep;
    }

    public getAdes(): string {
        return this.ades;
    }

    public getLogonInitie(): string {
        return this.logonInitie;
    }

    public getLogonAccepte(): string {
        return this.logonAccepte;
    }

    public getCmpAdrModeS(): string {
        return this.cmpAdrModeS;
    }

    public getCmpAdep(): string {
        return this.cmpAdep;
    }   
    
    public getCmpAdes(): string {
        return this.cmpAdes;
    }    

    public getCmpArcid(): string {
        return this.cmpArcid;
    }       

    public getConditionsLogon(): string {
        return this.conditionsLogon;
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
