import {EtatCpdlc} from './etatCpdlc';

export class Vol {
    /** identifiant echange entre le serveur air et le STPV pour designer un vol */
     private reqid: number;
     /**Identifiant du vol (code OACI ?) */
     private arcid: string;
     /**Identifiant plan de vol (numero cautra) */
     private plnid: number;
     /**nom du secteur logique traverse */
     private sl:string;
      /*liste des logs Mix concernant le vol */
     private listeLogsMix: EtatCpdlc[];
      /*liste des logs Lpln concernant le vol */
      private listeLogsLpln: EtatCpdlc[];
      /*liste des logs Vemgsa concernant le vol */
      private listeLogsVemgsa: EtatCpdlc[];

    constructor( arcid: string,plnid : number, sl : string, listeLogsLpln: EtatCpdlc[] , listeLogsVemgsa: EtatCpdlc[], listeLogsMix: EtatCpdlc[]) {
        this.arcid = arcid ;
        this.plnid = plnid ;
        this.sl = sl;
        this.listeLogsLpln = listeLogsLpln;
        this.listeLogsVemgsa = listeLogsVemgsa;
        this.listeLogsMix = listeLogsMix;
    }


    public setArcid( arcid : string):void {
        this.arcid = arcid;
    }

    public setReqid(vol : Vol, reqid : number):void {
        vol.reqid = reqid;
    }
    public setSL( sl : string):void {
        this.sl = sl;
    }


    public getArcid( ):string {
       return  this.arcid;
    }

    public getPlnid( ):number {
        return  this.plnid;
     }
     getVol(vol : Vol):string {
        console.log(vol.reqid);
        return "InfosVol :  " + vol.reqid;
    }

    public getListeVolLpln():EtatCpdlc[]{
        return this.listeLogsLpln;
    }
    public getListeVolVemgsa():EtatCpdlc[]{
        return this.listeLogsVemgsa;
    }
    public getListeVolMix():EtatCpdlc[]{
        return this.listeLogsMix;
    }
}
