import { Component, OnInit } from '@angular/core';
import {ConfigdataService} from "../services/configdata.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Environment} from "../interfaces/environment";
import {vCenter} from "../interfaces/vcenter";

@Component({
  selector: 'app-v-center-list',
  templateUrl: './v-center-list.component.html',
  styleUrls: ['./v-center-list.component.css']
})
export class VCenterListComponent implements OnInit {
  private routerSub: any;
  environment: Environment;
  vcenters: vCenter[];


  constructor(private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {

    this.routerSub = this.route.params.subscribe(params => {
      let envId: string = params['envId']; // (+) converts string 'id' to a number

      this.environment = ConfigdataService.getEnvironment(envId);
      if(this.environment){
        this.vcenters = this.environment.vcenters;
      }

    });
  }

}
