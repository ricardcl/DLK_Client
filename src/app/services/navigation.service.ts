import { Injectable } from '@angular/core';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  constructor(private _router: Router) { }

  public navigateToFormulaire () {
    this._router.navigateByUrl('/formulaire');
  }

  public navigateToVisualisation () {
    this._router.navigateByUrl('/visualisation');
  }

  public navigateToAccueil () {
    this._router.navigateByUrl('/accueil');
  }


}
