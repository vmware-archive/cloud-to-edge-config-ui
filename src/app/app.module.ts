import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {ClarityModule} from '@clr/angular';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FileSelectDirective} from 'ng2-file-upload';
import {FormsModule} from '@angular/forms';

import {HomeComponent} from './home/home.component';
import {ConfigdataService} from './services/configdata.service';
import {EnvironmentCreateComponent} from './environment-create/environment-create.component';
import {EnvironmentListComponent} from './environment-list/environment-list.component';
import {ClusterListComponent} from './cluster-list/cluster-list.component';
import {ClusterCreateComponent} from './cluster-create/cluster-create.component';
import {EdgeCreateComponent} from './edge-create/edge-create.component';
import {EdgeListComponent} from './edge-list/edge-list.component';
import {AppRoutingModule} from "./app-routing/app-routing.module";
import {LoadConfigComponent} from './load-config/load-config.component';


@NgModule({
  declarations: [
    AppComponent,
    FileSelectDirective,
    HomeComponent,
    EnvironmentCreateComponent,
    EnvironmentListComponent,
    ClusterListComponent,
    ClusterCreateComponent,
    EdgeCreateComponent,
    EdgeListComponent,
    LoadConfigComponent
  ],
  imports: [
    BrowserModule,
    ClarityModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
  ],
  providers: [ConfigdataService],
  bootstrap: [AppComponent]
})


export class AppModule {
}


