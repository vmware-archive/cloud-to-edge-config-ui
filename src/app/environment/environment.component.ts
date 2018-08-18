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

  constructor(private route: ActivatedRoute, private configDataService: ConfigdataService) {
  }


  ngOnInit() {
    this.routerSub = this.route.params.subscribe(params => {
      let envId: string = params['envId']; // (+) converts string 'id' to a number
      this.environment = ConfigdataService.getEnvironment(envId);
    });
  }

  onSubmit(){

  }

  buttonCancel(){

  }

}
