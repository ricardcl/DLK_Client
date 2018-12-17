import { Component } from '@angular/core';
import { CptService }from './cpt.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor (private _cptService : CptService){

  }

  public get Cpt () : number {
    return this._cptService.Cpt;
  }

  title = 'dlk-app';
}
