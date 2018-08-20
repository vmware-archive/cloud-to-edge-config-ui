import { Component, OnInit } from '@angular/core';
import {Environment} from "../interfaces/environment";
import {ConfigdataService} from "../services/configdata.service";
import {ActivatedRoute, Router} from "@angular/router";
import {vCenter} from "../interfaces/vcenter";

@Component({
  selector: 'app-v-center',
  templateUrl: './v-center.component.html',
  styleUrls: ['./v-center.component.css']
})
export class VCenterComponent implements OnInit {
  private routerSub: any;
  environment: Environment;
  vcenter: vCenter;

  readonly: boolean;

  constructor(private route: ActivatedRoute, private router: Router) {
  }


  ngOnInit() {
    this.routerSub = this.route.params.subscribe(params => {
      let envId: string = params['envId']; // (+) converts string 'id' to a number
      let vcId: string = params['vcId']; // (+) converts string 'id' to a number
      this.environment = ConfigdataService.getEnvironment(envId);
      let vcenters = this.environment.vcenters;
      for(let i=0; i<vcenters.length; i++){
        if(vcenters[i].id == vcId){
          this.vcenter = vcenters[i];
        }
      }
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

}
