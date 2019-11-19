import { TSMap } from "typescript-map";
import { Etat } from './enumEtat';
import { DetailCpdlc } from './detailCpdlc';

export class EtatCpdlc {
  private id: number;
  private title: string;
  private jour: string;
  private heure: string;
  private date: string;
  private etat: string;
  private associable: boolean;
  private log: string;
  private detailLog: DetailCpdlc[];
  private explication: string;
  private isTypeCPC: boolean; // VAUT 1 si CPDLC et 0 si  STPV 


  constructor(id: number, title: string, date: string,jour: string, heure: string, etat: string, associable: boolean, log: string, detailLog: DetailCpdlc[], explication:string) {
    this.id = id;
    this.title = title;
    this.date = date;
    this.jour = jour;
    this.heure = heure;
    this.etat = etat;
    this.associable = associable;
    this.log = log;
    this.detailLog = [];
    this.explication = explication;
  }

  /*getLogCpdlc() {

    return "\n InfoLog :  \n id = " +this.id + "\n date = " + this.date +  "\n heure = " + this.heure + "\n associable = " + this.associable +  this.etat.getEtatCpdlc();
  }*/


  getEtatCpdlc(): string {

    return "\nINfos EtatCpdlc :\n id = " + this.id + "\n title = " + this.title + "\n info = " + this.getDetaillog();
  }



  isDetail(key : string):boolean{
    let trouve:boolean =false;
    this.detailLog.forEach(element => {
      if ( key === element.key) trouve =true;;
    });
    return trouve;
  }

  getDetail(key : string){
    if (this.isDetail ( key)) {
      let result:string;
      this.detailLog.forEach(element => {
        if ( key == element.key) {
          result = element.value;
        }
      });
      return result;
    }
    else return undefined;


  }

  setDetailLog(array : DetailCpdlc[]){
    this.detailLog = array;
  }

  addDetail(detail : DetailCpdlc){
    if (this.isDetail(detail.key) ) {
  
      this.detailLog.forEach((element,index) => {
        if ( detail.key === element.key) {
          delete  this.detailLog[index];
        }
      });
    }
      this.detailLog.push(detail);
   
  }

  //GETTERS
  getTitle(): string {
    return this.title;
  }
  getDate(): string {
    return this.date;
  }
  getJour(): string {
    return this.jour;
  }
  getHeure(): string {
    return this.date
  }
  getEtat(): string {
    return this.etat
  }

  getLog(): string{
    return this.log;
  }
  getExplication():string{
    return this.explication;
  }

  getDetaillog(){
    return this.detailLog;
  }

  

  //SETTERS
  setTitle(title: string) {
    this.title = title;
  }
  setDate(date: string) {
    this.date = date;
  }
  setJour(jour: string) {
    this.jour = jour;
  }
  setHeure(heure: string) {
    this.heure = heure;
  }

  setExplication(explication: string) {
    this.explication = explication;
  }
  
  setEtat(etat: Etat) {
    this.etat = etat;
  }
  setAssociable(associable: boolean) {
    this.associable = associable;
  }

 setLog(log: string) {
    this.log = log;
  }


}



/*

exemples utilisation map
map.get(1) // "hello"
map.get(k2) // "world"
map.size // 3
map.keys() // [1, [2], true]
map.values() // ["hello", "ts", "map"]


map.forEach((value, key, map) => {
  console.log(key, ':', value)
})*/
