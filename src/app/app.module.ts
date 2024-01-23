import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LernenComponent } from './lernen/lernen.component';
import { TrainingComponent } from './training/training.component';
import { PruefungComponent } from './pruefung/pruefung.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LernenComponent,
    TrainingComponent,
    PruefungComponent 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
