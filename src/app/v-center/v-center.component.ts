import {Component, OnInit} from '@angular/core';
import {Environment} from "../interfaces/environment";
import {ConfigdataService} from "../services/configdata.service";
import {ActivatedRoute, Router} from "@angular/router";
import {vCenter} from "../interfaces/vcenter";
import {ConfigFactory} from "../classes/config-factory";

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
  adding: boolean;

  constructor(private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.routerSub = this.route.params.subscribe(params => {
      let envId: string = params['envId']; // (+) converts string 'id' to a number
      let vcId: string = params['vcId']; // (+) converts string 'id' to a number
      this.environment = ConfigdataService.getEnvironment(envId);

      if (vcId === "new") {
        this.adding = true;
        this.readonly = false;
        this.vcenter = ConfigFactory.createVCenter();
      } else {
        this.vcenter = ConfigdataService.getVCenter(envId, vcId);
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
    ConfigdataService.setVCenter(this.environment.id, this.vcenter);
    this.router.navigateByUrl("/environment/" + this.environment.id + "/vcenterlist");
  }

  buttonCancel() {
    this.router.navigateByUrl("/environment/" + this.environment.id + "/vcenterlist");
  }

}
