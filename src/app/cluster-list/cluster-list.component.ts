import { Component, OnInit, OnDestroy } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Environment} from "../interfaces/environment";
import {Cluster} from "../interfaces/cluster";
import { ConfigdataService } from '../services/configdata.service';
import {vCenter} from "../interfaces/vcenter";

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

  ngOnDestroy() {
    this.routerSub.unsubscribe();
  }



}
