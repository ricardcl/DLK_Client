import { Component, OnInit } from '@angular/core';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-prout',
  templateUrl: './prout.component.html',
  styleUrls: ['./prout.component.css']
})
export class ProutComponent implements OnInit {

  constructor(private _navigationService : NavigationService) { }

  ngOnInit() {
  }

  public navigateToFormulaire () : void {
    this._navigationService.navigateToFormulaire();
  }

}
