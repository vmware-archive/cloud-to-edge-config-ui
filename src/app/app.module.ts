import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ClarityModule } from '@clr/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ConfigdataService } from './services/configdata.service';


const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  }
];


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    ClarityModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [ConfigdataService],
  bootstrap: [AppComponent]
})


export class AppModule { }
