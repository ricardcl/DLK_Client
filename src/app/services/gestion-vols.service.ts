import { Injectable } from '@angular/core';
import { Vol } from '../models/vol';
import { EventEmitter } from 'events';

@Injectable({
  providedIn: 'root'
})
export class GestionVolsService {

  private listeVols: Vol[];
  private test : number =0 ;
  testUpdated:EventEmitter = new EventEmitter();
  constructor() { 
    this.listeVols = [];
  }

  public getNbVols(): number {
      return this.listeVols.length;
  }

  public addVol(vol: Vol) {
      this.listeVols.push(vol);
  }

  public getVol(num: number): Vol {
      return this.listeVols[num];
  }
  public getTest(): number {
    return this.test;
}
public setTest(num: number) {
   this.test=num;
}


}
