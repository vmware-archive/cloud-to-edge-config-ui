import { Component, OnInit, OnDestroy } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Environment} from "../interfaces/environment";
import {Cluster} from "../interfaces/cluster";
import { ConfigdataService } from '../services/configdata.service';
import {vCenter} from "../interfaces/vcenter";
import {ConfigFactory} from "../classes/config-factory";

@Component({
  selector: 'app-cluster-list',
  templateUrl: './cluster-list.component.html',
  styleUrls: ['./cluster-list.component.css']
})
export class ClusterListComponent implements OnInit {
  private routerSub: any;
  environment: Environment;
  vcenter: vCenter;
  clusters: Cluster[];
  selectedCluster: Cluster;
  showDeleteDialog = false;

  readonly: boolean;

  constructor(private route: ActivatedRoute, private router: Router) {
  }


  ngOnInit() {
    this.routerSub = this.route.params.subscribe(params => {
      let envId: string = params['envId']; // (+) converts string 'id' to a number
      let vcId: string = params['vcId']; // (+) converts string 'id' to a number
      this.environment = ConfigdataService.getEnvironment(envId);
      this.vcenter = ConfigdataService.getVCenter(envId, vcId);
      this.clusters = this.vcenter.clusters;
      this.selectedCluster = ConfigFactory.createCluster();
      this.readonly = true;
    });
  }


  isDisabled(): boolean {
    //console.log("disabled:" + this.readonly);

    return this.readonly;
  }

  onEdit() {
    this.readonly = false;
  }

  onSubmit() {

  }

  buttonCancel() {
    this.router.navigateByUrl("/environment/" + this.environment.id + "/vcenterlist");
  }



  onShowConfirmDelete(clusterId){

    for(let i =0; i < this.clusters.length; i++){
      if(this.clusters[i].id == clusterId){
        this.selectedCluster = this.clusters[i];
        break;
      }
    }
    this.showDeleteDialog = true;

  }

  onDeleteConfirm(){
    this.showDeleteDialog = false;

    if(this.selectedCluster){
      this.clusters = ConfigdataService.deleteCluster(this.environment.id, this.vcenter.id, this.selectedCluster);
    }

  };

  ngOnDestroy() {
    this.routerSub.unsubscribe();
  }



}
