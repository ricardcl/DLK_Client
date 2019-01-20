import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormulaireComponent }      from './components/formulaire/formulaire.component';
import { ProutComponent } from './components/prout/prout.component';


const routes: Routes = [
  { path: 'formulaire', component: FormulaireComponent },
  { path: 'prout', component: ProutComponent },
  { path: '', redirectTo: '/formulaire', pathMatch: 'full' }
];

 
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}