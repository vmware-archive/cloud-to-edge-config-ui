import {Component, OnInit} from '@angular/core';
import {ConfigdataService} from "../services/configdata.service";
import {ActivatedRoute} from "@angular/router";
import {Environment} from "../interfaces/environment";

@Component({
  selector: 'app-environment',
  templateUrl: './environment.component.html',
  styleUrls: ['./environment.component.css']
})
export class EnvironmentComponent implements OnInit {
  private routerSub: any;
  environment: Environment;
  readonly: boolean;

  constructor(private route: ActivatedRoute, private configDataService: ConfigdataService) {
  }


  ngOnInit() {
    this.routerSub = this.route.params.subscribe(params => {
      let envId: string = params['envId']; // (+) converts string 'id' to a number
      this.environment = ConfigdataService.getEnvironment(envId);
      this.readonly = false;
    });
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


  onSubmit() {

  }

  buttonCancel() {

  }

}
