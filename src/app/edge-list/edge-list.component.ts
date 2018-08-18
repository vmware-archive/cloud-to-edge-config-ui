import { Component, OnInit } from '@angular/core';
import {Environment} from "../interfaces/environment";
import {Cluster} from "../interfaces/cluster";
import {Edge} from "../interfaces/edge";
import {ConfigdataService} from "../services/configdata.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-edge-list',
  templateUrl: './edge-list.component.html',
  styleUrls: ['./edge-list.component.css']
})
export class EdgeListComponent implements OnInit {
  public cluster: Cluster;

  public edges: Edge[];
  private routerSub: any;
  constructor(private route: ActivatedRoute, private configDataService: ConfigdataService) { }

  ngOnInit() {
    this.routerSub = this.route.params.subscribe(params => {
      let id:number = +params['clusterId']; // (+) converts string 'id' to a number
      this.cluster = ConfigdataService.getCluster(2,id);
      this.edges = this.cluster.edges;
      console.log("clusters:" + JSON.stringify(this.edges));
    });
  }

  ngOnDestroy() {
    this.routerSub.unsubscribe();
  }

}
