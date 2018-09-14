import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HttpConfigService} from "../services/http-config.service";
import {Environment} from "../interfaces/environment";
import {ConfigdataService} from "../services/configdata.service";
import {EdgeSummary} from "../interfaces/edge-summary";
import {ConfigFactory} from "../classes/config-factory";

@Component({
  selector: 'app-environment-edge-list',
  templateUrl: './environment-edge-list.component.html',
  styleUrls: ['./environment-edge-list.component.css']
})
export class EnvironmentEdgeListComponent implements OnInit {
  private routerSub: any;
  environment: Environment;
  edges: EdgeSummary[];

  selectedEdge: EdgeSummary;
  showDeleteDialog = false;


  constructor(private route: ActivatedRoute,
              private router: Router,
              private httpConfig: HttpConfigService) { }

  ngOnInit() {

    this.httpConfig.loadConfig().subscribe(configData => {
      ConfigdataService.setConfig(configData);
      this.routerSub = this.route.params.subscribe(params => {
        let envId: string = params['envId']; // (+) converts string 'id' to a number

        this.environment = ConfigdataService.getEnvironment(envId);
        if(this.environment){
          this.edges = ConfigdataService.getEnvironmentEdges(envId);
        }

      });
    });



  }


  onDeleteConfirm() {
    alert("Edge Delete Test");
    // this.showDeleteDialog = false;
    //
    // if (this.selectedEdge) {
    //   this.edges = ConfigdataService.deleteEdge(this.selectedEdge);
    //   this.httpConfig.saveConfig(ConfigdataService.getConfig())
    //
    // }

  } ;

}
