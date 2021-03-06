import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionComponent } from './section/section.component';
import { SectionVisualisationVolComponent } from './section-visualisation-vol/section-visualisation-vol.component';
import { SectionFormulaireComponent } from './section-formulaire/section-formulaire.component';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule,MatCardModule,MatDatepickerModule,MatListModule,MatDividerModule } from '@angular/material';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatRadioModule } from '@angular/material/radio';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { VerticalTimelineModule } from 'angular-vertical-timeline';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule, MatCheckboxModule } from '@angular/material';
import { MatStepperModule } from '@angular/material/stepper';
import { SectionVisualisationComponent } from './section-visualisation/section-visualisation.component';
import {MatIconModule} from '@angular/material/icon';
import { TimelineSimpleComponent } from './timeline-simple/timeline-simple.component'; 
import {MatBadgeModule} from '@angular/material/badge';
import { TimelineFrequenceComponent } from './timeline-frequence/timeline-frequence.component';
import { InputFileComponent } from '../lib/input-file/input-file.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatGridListModule} from '@angular/material/grid-list'; 

@NgModule({
    declarations: [SectionComponent, SectionFormulaireComponent, SectionVisualisationVolComponent, SectionVisualisationComponent, TimelineSimpleComponent, TimelineFrequenceComponent, InputFileComponent],
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
        MatCardModule,
        MatInputModule,
        MatExpansionModule,
        MatTabsModule,
        MatCheckboxModule,
        MatStepperModule,
        MatIconModule,
        MatDatepickerModule,
        MatMomentDateModule,
        MatBadgeModule,
        MatTooltipModule,
        MatListModule,
        MatDividerModule,
        MatGridListModule
    ],
    exports: [SectionComponent]
})
export class SectionModule { }
