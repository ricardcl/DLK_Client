import { Injectable } from '@angular/core';
import { Vol } from '../models/vol';
import { EventEmitter } from 'events';
import { AnalyseState } from '../models/analyseState';

@Injectable({
  providedIn: 'root'
})
export class GestionVolsService {

  private listeVols: Vol[];
  private analyseState: AnalyseState = AnalyseState.IDLE;

  constructor() { 
    this.listeVols = [];
  }

  public getNbVols(): number {
      return this.listeVols.length;
  }

  public addVol(vol: Vol) {
      this.listeVols.push(vol);
    //  this.analyseState = AnalyseState.ANALYSED;
  }

  public getVol(num: number): Vol {
      return this.listeVols[num];
  }

  
  public getAnalyseState() {
    return this.analyseState;
  }


}
