import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "../home/home.component";
import {EnvironmentListComponent} from "../environment-list/environment-list.component";
import {EnvironmentCreateComponent} from "../environment-create/environment-create.component";
import {ClusterListComponent} from "../cluster-list/cluster-list.component";
import {ClusterCreateComponent} from "../cluster-create/cluster-create.component";
import {EdgeListComponent} from "../edge-list/edge-list.component";
import {EdgeCreateComponent} from "../edge-create/edge-create.component";
import {LoadConfigComponent} from "../load-config/load-config.component";

const routes: Routes = [
  { path:  '', redirectTo:  'home', pathMatch:  'full' },
  {
    path:  'home',
    component:  HomeComponent
  },  {
    path:  'environmentcreate',
    component:  EnvironmentCreateComponent
  },  {
    path:  'environmentlist',
    component:  EnvironmentListComponent
  },  {
    path:  'clustercreate',
    component:  ClusterCreateComponent
  },  {
    path:  'clusterlist/:envId',
    component:  ClusterListComponent
  },  {
    path:  'edgecreate',
    component:  EdgeCreateComponent
  },  {
    path:  'edgelist',
    component:  EdgeListComponent
  },  {
    path:  'loadconfig',
    component:  LoadConfigComponent
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
