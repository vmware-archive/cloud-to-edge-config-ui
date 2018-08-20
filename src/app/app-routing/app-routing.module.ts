import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "../home/home.component";
import {EnvironmentListComponent} from "../environment-list/environment-list.component";
import {ClusterListComponent} from "../cluster-list/cluster-list.component";
import {LoadConfigComponent} from "../load-config/load-config.component";
import {EnvironmentComponent} from "../environment/environment.component";
import {VCenterListComponent} from "../v-center-list/v-center-list.component";
import {VCenterComponent} from "../v-center/v-center.component";
import {ClusterComponent} from "../cluster/cluster.component";
import {EdgeListComponent} from "../edge-list/edge-list.component";
import {EdgeComponent} from "../edge/edge.component";

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {
    path: 'home',
    component: HomeComponent
  }, {
    path: 'environmentlist',
    component: EnvironmentListComponent
  },{
    path: 'environment/:envId',
    component: EnvironmentComponent
  },{
    path: 'environment/:envId/vcenterlist',
    component: VCenterListComponent
  }, {
    path: 'environment/:envId/vcenter/:vcId',
    component: VCenterComponent
  }, {
    path: 'environment/:envId/vcenter/:vcId/clusterlist',
    component: ClusterListComponent
  }, {
    path: 'environment/:envId/vcenter/:vcId/cluster/:clusterId',
    component: ClusterComponent
  }, {
    path: 'environment/:envId/vcenter/:vcId/cluster/:clusterId/edgelist',
    component: EdgeListComponent
  },{
    path: 'environment/:envId/vcenter/:vcId/cluster/:clusterId/edge/:edgeId',
    component: EdgeComponent
  },{
    path: 'loadconfig',
    component: LoadConfigComponent
  }
];

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
