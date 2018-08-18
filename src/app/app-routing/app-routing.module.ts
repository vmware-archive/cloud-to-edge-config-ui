import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "../home/home.component";
import {EnvironmentListComponent} from "../environment-list/environment-list.component";
import {ClusterListComponent} from "../cluster-list/cluster-list.component";
import {EdgeListComponent} from "../edge-list/edge-list.component";
import {LoadConfigComponent} from "../load-config/load-config.component";
import {EnvironmentComponent} from "../environment/environment.component";

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {
    path: 'home',
    component: HomeComponent
  }, {
    path: 'environment/:envId',
    component: EnvironmentComponent
  }, {
    path: 'environmentlist',
    component: EnvironmentListComponent
  }, {
    path: 'clusterlist/:envId',
    component: ClusterListComponent
  }, {
    path: 'edgelist/:clusterId',
    component: EdgeListComponent
  }, {
    path: 'loadconfig',
    component: LoadConfigComponent
  }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule {
}
