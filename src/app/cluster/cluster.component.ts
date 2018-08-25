import {Component, OnInit} from '@angular/core';
import {Environment} from "../interfaces/environment";
import {ConfigdataService} from "../services/configdata.service";
import {ActivatedRoute, Router} from "@angular/router";
import {vCenter} from "../interfaces/vcenter";
import {Cluster} from "../interfaces/cluster";
import {ConfigFactory} from "../classes/config-factory";
import {HttpConfigService} from "../services/http-config.service";

@Component({
  selector: 'app-cluster',
  templateUrl: './cluster.component.html',
  styleUrls: ['./cluster.component.css']
})
export class ClusterComponent implements OnInit {
  private routerSub: any;
  environment: Environment;
  vcenter: vCenter;
  cluster: Cluster;

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

      if (clusterId === "new") {
        this.adding = true;
        this.readonly = false;
        this.cluster = ConfigFactory.createCluster();
      } else {
        this.cluster = ConfigdataService.getCluster(envId, vcId, clusterId);
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
    ConfigdataService.setCluster(this.environment.id, this.vcenter.id, this.cluster);
    this.httpConfig.saveConfig(ConfigdataService.getConfig())
      .then(response => this.router.navigateByUrl("/environment/" + this.environment.id + "/vcenter/" + this.vcenter.id + "/clusterlist"));

  }

  buttonCancel() {
    this.router.navigateByUrl("/environment/" + this.environment.id + "/vcenter/" + this.vcenter.id + "/clusterlist");
  }


}
