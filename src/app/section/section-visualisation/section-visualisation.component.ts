import { Component, OnInit } from '@angular/core';
import { UploadService } from 'src/app/services/upload.service';

@Component({
  selector: 'app-section-visualisation',
  templateUrl: './section-visualisation.component.html',
  styleUrls: ['./section-visualisation.component.css']
})
export class SectionVisualisationComponent implements OnInit {

  constructor(private _chargerFormulaireService: UploadService) { }

  ngOnInit() {
  }

  navigateToFormulaire(){
    //TODO
    console.log("coucou");
  }

}
