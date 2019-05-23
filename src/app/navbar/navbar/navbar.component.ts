import { Component, OnInit } from '@angular/core';
import { NavigationService } from 'src/app/services/navigation.service';
import {MatSidenavModule} from '@angular/material/sidenav';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  
  constructor(private _navigationService: NavigationService) {

  }

  public navigateToAccueil(): void {
    this._navigationService.navigateToAccueil();

  }





}
