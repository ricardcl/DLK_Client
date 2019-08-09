import { Injectable } from '@angular/core';
import { Vol } from '../models/vol';

@Injectable({
  providedIn: 'root'
})
export class GestionVolsService {

  private listeVols: Vol[];

  constructor() { 
    this.listeVols = [];
  }

  public getNbVols(): number {
      return this.listeVols.length;
  }

  public addVol(vol: Vol) {
      this.listeVols.push(vol);
  }

  public getVols(): Vol[] {
      return this.listeVols;
  }

}
