import { Component, OnInit } from '@angular/core';
import {Environment} from "../interfaces/environment";
import {Cluster} from "../interfaces/cluster";
import {Edge} from "../interfaces/edge";
import {ConfigdataService} from "../services/configdata.service";
import {ActivatedRoute, Router} from "@angular/router";
import {vCenter} from "../interfaces/vcenter";
import {ConfigFactory} from "../classes/config-factory";
import {HttpConfigService} from "../services/http-config.service";

@Component({
  selector: 'app-edge-list',
  templateUrl: './edge-list.component.html',
  styleUrls: ['./edge-list.component.css']
})
export class EdgeListComponent implements OnInit {
  private routerSub: any;
  environment: Environment;
  vcenter: vCenter;
  cluster: Cluster;
  edges: Edge[];
  selectedEdge: Edge;
  showDeleteDialog = false;

  readonly: boolean;
  adding: boolean;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private httpConfig: HttpConfigService) {
  }


  ngOnInit() {
    this.routerSub = this.route.params.subscribe(params => {
      let envId: string = params['envId']; // (+) converts string 'id' to a number
      let vcId: string = params['vcId']; // (+) converts string 'id' to a number
      let clusterId: string = params['clusterId']; // (+) converts string 'id' to a number
      this.environment = ConfigdataService.getEnvironment(envId);
      this.vcenter = ConfigdataService.getVCenter(envId, vcId);
      this.cluster = ConfigdataService.getCluster(envId, vcId, clusterId);
      this.edges = this.cluster.edges;
      this.selectedEdge = ConfigFactory.createEdge(this.environment);

      this.readonly = true;
      this.adding = true;

    });
  }


  isDisabled(): boolean {
    //console.log("disabled:" + this.readonly);

    return this.readonly;
  }


  onAddEdge(){

}


  buttonCancel() {
    this.router.navigateByUrl("/environment/" + this.environment.id + "/vcenter/" + this.vcenter.id + "/clusterlist");
  }

  ngOnDestroy() {
    this.routerSub.unsubscribe();
  }


  onShowConfirmDelete(edgeId){

    for(let i =0; i < this.edges.length; i++){
      if(this.edges[i].id == edgeId){
        this.selectedEdge = this.edges[i];
        break;
      }
    }
    this.showDeleteDialog = true;

  }

  onDeleteConfirm(){
    this.showDeleteDialog = false;

    if(this.selectedEdge){
      this.edges = ConfigdataService.deleteEdge(this.environment.id, this.vcenter.id, this.cluster.id, this.selectedEdge);
      this.httpConfig.saveConfig(ConfigdataService.getConfig())

    }

  };


}
