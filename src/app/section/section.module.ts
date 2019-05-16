import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionComponent } from './section/section.component';
import { SectionVisualisationComponent } from './section-visualisation/section-visualisation.component';
import { SectionFormulaireFichiersComponent } from './section-formulaire-fichiers/section-formulaire-fichiers.component';
import { SectionFormulaireIdComponent } from './section-formulaire-id/section-formulaire-id.component';
import { SectionFormulaireComponent } from './section-formulaire/section-formulaire.component';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material';
import { MatRadioModule } from '@angular/material/radio';
import {MatTableModule} from '@angular/material/table'; 
import {MatInputModule} from '@angular/material/input'; 
import {MatToolbarModule} from '@angular/material/toolbar'; 
import { VerticalTimelineModule } from 'angular-vertical-timeline';



@NgModule({
  declarations: [SectionComponent, SectionFormulaireComponent, SectionVisualisationComponent, SectionFormulaireFichiersComponent, SectionFormulaireIdComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatButtonModule,
    MatTableModule,
    VerticalTimelineModule,
    MatToolbarModule,
    MatRadioModule,
    MatInputModule,
  ],
  exports: [SectionComponent]
})
export class SectionModule { }
