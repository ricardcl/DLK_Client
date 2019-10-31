import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SectionVisualisationVolComponent } from './section/section-visualisation-vol/section-visualisation-vol.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PageAccueilComponent } from './page-accueil/page-accueil.component';
import { SectionVisualisationComponent } from './section/section-visualisation/section-visualisation.component';
import { SectionFormulaireComponent } from './section/section-formulaire/section-formulaire.component';
import { PageDocumentationComponent } from './page-documentation/page-documentation.component';



const routes: Routes = [
  { path: 'accueil', component: PageAccueilComponent },
  { path: 'formulaire', component: SectionFormulaireComponent },
  { path: 'documentation', component: PageDocumentationComponent },
  { path: 'visualisation/:id', component: SectionVisualisationComponent },

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