import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LernenComponent } from './lernen/lernen.component'; 
import { TrainingComponent } from './training/training.component'; 
import { PruefungComponent } from './pruefung/pruefung.component';
import { SingleChoiceComponent } from './single-choice/single-choice.component';
import { MultipleChoiceComponent } from './multiple-choice/multiple-choice.component'; 
import { FillinComponent } from './fillin/fillin.component';
 

const routes: Routes = [
  { path: 'lernen', component: LernenComponent },
  { path: 'training', component: TrainingComponent },
  { path: 'pruefung', component: PruefungComponent },
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: 'single', component: SingleChoiceComponent},
  { path: 'multiple', component: MultipleChoiceComponent},
  { path: 'manual', component: FillinComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
