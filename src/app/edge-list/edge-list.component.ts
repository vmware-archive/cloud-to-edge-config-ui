import { Component, OnInit } from '@angular/core';
import {Environment} from "../interfaces/environment";
import {Cluster} from "../interfaces/cluster";
import {Edge} from "../interfaces/edge";
import {ConfigdataService} from "../services/configdata.service";
import {ActivatedRoute, Router} from "@angular/router";
import {vCenter} from "../interfaces/vcenter";

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

  readonly: boolean;
  adding: boolean;

  constructor(private route: ActivatedRoute, private router: Router) {
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

      this.readonly = true;
      this.adding = true;

    });
  }


  isDisabled(): boolean {
    //console.log("disabled:" + this.readonly);

    return this.readonly;
  }

  onEdit() {
    this.readonly = false;
  }

  onAddEdge(){

}

  onSubmit() {

  }

  buttonCancel() {
    this.router.navigateByUrl("/environment/" + this.environment.id + "/vcenter/" + this.vcenter.id + "/clusterlist");
  }

  ngOnDestroy() {
    this.routerSub.unsubscribe();
  }



}
