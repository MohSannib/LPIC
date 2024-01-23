import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LernenComponent } from './lernen/lernen.component'; 
import { TrainingComponent } from './training/training.component'; 
import { PruefungComponent } from './pruefung/pruefung.component'; 
 

const routes: Routes = [
  { path: 'lernen', component: LernenComponent },
  { path: 'training', component: TrainingComponent },
  { path: 'pruefung', component: PruefungComponent },
  { path: '', redirectTo: '/', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
