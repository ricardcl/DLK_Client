import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SectionComponent } from './section/section/section.component';
import { SectionFormulaireComponent } from './section/section-formulaire/section-formulaire.component';
import { SectionVisualisationComponent } from './section/section-visualisation/section-visualisation.component';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PageAccueilComponent } from './page-accueil/page-accueil.component';



const routes: Routes = [
  { path: 'accueil', component: PageAccueilComponent },
  { path: 'formulaire', component: SectionComponent },
 // { path: 'visualisation', component: SectionVisualisationComponent },
 // { path: 'documentation', component: SectionDocumentationComponent },
  { path: '', redirectTo: '/accueil', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

 


@NgModule({
  imports: [ RouterModule.forRoot(routes
   //, { enableTracing: true } // <-- debugging purposes only
    ) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}