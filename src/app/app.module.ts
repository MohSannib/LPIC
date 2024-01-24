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

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LernenComponent,
    TrainingComponent,
    PruefungComponent,
    SingleChoiceComponent,
    MultipleChoiceComponent,
    FillinComponent 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
