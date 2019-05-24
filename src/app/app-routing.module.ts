import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SectionComponent } from './section/section/section.component';
import { SectionFormulaireComponent } from './section/section-formulaire/section-formulaire.component';
import { SectionVisualisationComponent } from './section/section-visualisation/section-visualisation.component';
import { AppComponent } from './app.component';



const routes: Routes = [
  { path: 'accueil', component: SectionComponent },
  { path: 'formulaire', component: SectionFormulaireComponent },
 // { path: 'visualisation', component: SectionVisualisationComponent },
 // { path: 'documentation', component: SectionDocumentationComponent },
  { path: '', redirectTo: '/accueil', pathMatch: 'full' }
];

 


@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}