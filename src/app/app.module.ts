import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LernenComponent } from './lernen/lernen.component';
import { TrainingComponent } from './training/training.component';
import { PruefungComponent } from './pruefung/pruefung.component';
import { SingleChoiceComponent } from './single-choice/single-choice.component';
import { MultipleChoiceComponent } from './multiple-choice/multiple-choice.component';
import { FillinComponent } from './fillin/fillin.component';
import { AllquestionsComponent } from './allquestions/allquestions.component';
import { TrainingsiComponent } from './trainingsi/trainingsi.component';
import { TrainingmuComponent } from './trainingmu/trainingmu.component';
import { TrainingmaComponent } from './trainingma/trainingma.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LernenComponent,
    TrainingComponent,
    PruefungComponent,
    SingleChoiceComponent,
    MultipleChoiceComponent,
    FillinComponent,
    AllquestionsComponent,
    TrainingsiComponent,
    TrainingmuComponent,
    TrainingmaComponent 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
