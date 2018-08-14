import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute} from "@angular/router";
import {Environment} from "../interfaces/environment";
import {Cluster} from "../interfaces/cluster";
import { ConfigdataService } from '../services/configdata.service';

@Component({
  selector: 'app-cluster-list',
  templateUrl: './cluster-list.component.html',
  styleUrls: ['./cluster-list.component.css']
})
export class ClusterListComponent implements OnInit {
  public environment: Environment;
  public clusters: Cluster[];
  private routerSub: any;


  constructor(private route: ActivatedRoute, private configDataService: ConfigdataService) { }

  ngOnInit() {
    this.routerSub = this.route.params.subscribe(params => {
      let id:number = +params['envId']; // (+) converts string 'id' to a number
      this.environment = ConfigdataService.getEnvironment(id);
      this.clusters = this.environment.clusters;
      console.log("clusters:" + JSON.stringify(this.clusters));
    });
  }

  ngOnDestroy() {
    this.routerSub.unsubscribe();
  }

  getEdgeCount(clusterId) : number{
    return ConfigdataService.getEdgeCount(this.environment.id, clusterId);
  }

}
