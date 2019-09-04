import { TSMap } from "typescript-map";
import { Etat } from './enumEtat';
import { DetailCpdlc } from './detailCpdlc';

export class EtatCpdlc {
  private id: number = 0;
  private title: string = "";
  private date: string = "";
  private jour: string = "";
  private heure: string = "";
  private etat: string ="";
  private associable: boolean = false;
  private log:string = "";
  private detailLog : DetailCpdlc[];


  constructor(id: number, title: string, date: string,jour: string, heure: string, etat: string, associable: boolean, log: string, detailLog: DetailCpdlc[]) {
    this.id = id;
    this.title = title;
    this.date = date;
    this.jour = jour;
    this.heure = heure;
    this.etat = etat;
    this.associable = associable;
    this.log = log;
    this.detailLog = [];
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

  
  setEtat(etat: Etat) {
    this.etat = etat;
  }
  setAssociable(associable: boolean) {
    this.associable = associable;
  }

 setLog(log: string) {
    this.log = log;
  }

  getDetaillog(){
    return this.detailLog;
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
