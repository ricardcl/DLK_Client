import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-documentation',
  templateUrl: './page-documentation.component.html',
  styleUrls: ['./page-documentation.component.css']
})
export class PageDocumentationComponent implements OnInit {

  
  constructor() {
      }

  ngOnInit() {
  }
  public panelOpenState: boolean[]  =  [false,false];
 

  public togglePanel(numPanel:number) {
    this.panelOpenState[numPanel] = !this.panelOpenState[numPanel]
    console.log("panelOpenState", this.panelOpenState);

  }

}
