import {Component, OnInit} from '@angular/core';
import {ConfigdataService} from "../services/configdata.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Environment} from "../interfaces/environment";
import {ConfigFactory} from "../classes/config-factory";

@Component({
  selector: 'app-environment',
  templateUrl: './environment.component.html',
  styleUrls: ['./environment.component.css']
})
export class EnvironmentComponent implements OnInit {
  private routerSub: any;
  environment: Environment;
  readonly: boolean;
  adding: boolean;

  constructor(private route: ActivatedRoute, private router: Router) {
  }


  ngOnInit() {
    this.routerSub = this.route.params.subscribe(params => {
      let envId: string = params['envId']; // (+) converts string 'id' to a number
      if (envId === "new") {
        this.adding = true;
        this.readonly = false;
        this.environment = ConfigFactory.createEnvironment();
      } else {
        this.environment = ConfigdataService.getEnvironment(envId);
        this.readonly = true;
      }    });
  }

  // radio button data binding does not seem to work
  onRadioClickDeploymentType() {
    if (!this.readonly) {
      this.environment.deployCustom = !this.environment.deployCustom;
      this.environment.deployUniform = !this.environment.deployUniform;
    }
  }

  onRadioClickFaultToleranceType() {
    if (!this.readonly) {
      this.environment.ftStandard = !this.environment.ftStandard;
      this.environment.ftNoDown = !this.environment.ftNoDown;
    }
  }

  isDisabled(): boolean {
    //console.log("disabled:" + this.readonly);

    return this.readonly;
  }

  isFaultToleranceDisabled(): boolean {
    let isDisabled = this.readonly;
    if (!this.environment.typeGG && !this.environment.typeAzure) {
      isDisabled = true;
    }
    return isDisabled;
  }

  onEdit() {
    this.readonly = false;
  }

  onSubmit() {

  }

  buttonCancel() {
    this.router.navigateByUrl("environmentlist");
  }

}
