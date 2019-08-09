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

  public deleteVol (id : string) : boolean {
    for (let i : number = 0 ; i < this.getNbVols() ; i++) {
      if (this.getVols()[i].getId() === id) {
        this.getVols().splice(i, 1);
        return true;
      }
    }
    return false;
  }

  public getVols(): Vol[] {
      return this.listeVols;
  }

  public getVolById (id : string) : Vol {
    for (let vol of this.getVols()) {
      if (vol.getId() === id) {
        return vol;
      }
    }
    return undefined;
  }

}
