import {Component, OnInit} from '@angular/core';
import {ConfigdataService} from "../services/configdata.service";
import {Cluster} from "../interfaces/cluster";
import {vCenter} from "../interfaces/vcenter";
import {ActivatedRoute, Router} from "@angular/router";
import {Environment} from "../interfaces/environment";
import {Edge} from "../interfaces/edge";
import {ConfigFactory} from "../classes/config-factory";

@Component({
  selector: 'app-edge',
  templateUrl: './edge.component.html',
  styleUrls: ['./edge.component.css']
})
export class EdgeComponent implements OnInit {
  private routerSub: any;
  environment: Environment;
  vcenter: vCenter;
  cluster: Cluster;
  edge: Edge;

  readonly: boolean;
  adding: boolean;

  constructor(private route: ActivatedRoute, private router: Router) {
  }


  ngOnInit() {
    this.routerSub = this.route.params.subscribe(params => {
      let envId: string = params['envId']; // (+) converts string 'id' to a number
      let vcId: string = params['vcId'];
      let clusterId: string = params['clusterId'];
      let edgeId: string = params['edgeId'];
      this.environment = ConfigdataService.getEnvironment(envId);
      this.vcenter = ConfigdataService.getVCenter(envId, vcId);
      this.cluster = ConfigdataService.getCluster(envId, vcId, clusterId);

      if (edgeId === "new") {
        this.adding = true;
        this.readonly = false;
        this.edge = ConfigFactory.createEdge(this.environment);

      } else {
        this.edge = ConfigdataService.getEdge(envId, vcId, clusterId, edgeId);
        this.readonly = true;
      }

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

    ConfigdataService.setEdge(this.environment.id, this.vcenter.id, this.cluster.id, this.edge);
    this.router.navigateByUrl("/environment/" + this.environment.id + "/vcenter/" + this.vcenter.id + "/cluster/" + this.cluster.id + "/edgelist");

  }

  buttonCancel() {
    this.router.navigateByUrl("/environment/" + this.environment.id + "/vcenter/" + this.vcenter.id + "/cluster/" + this.cluster.id + "/edgelist");
  }


}
