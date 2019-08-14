import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SectionComponent } from './section/section/section.component';
import { SectionVisualisationComponent } from './section/section-visualisation/section-visualisation.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PageAccueilComponent } from './page-accueil/page-accueil.component';
import { VisuComponent } from './section/visu/visu.component';



const routes: Routes = [
  { path: 'accueil', component: PageAccueilComponent },
  { path: 'formulaire', component: SectionComponent },
  { path: 'visualisation/:id', component: VisuComponent },

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