import {Component, OnInit} from '@angular/core';
import {ConfigdataService} from '../services/configdata.service';
import {Environment} from "../interfaces/environment";
import {Router} from "@angular/router";
import {ConfigFactory} from "../classes/config-factory";
import {HttpConfigService} from "../services/http-config.service";

@Component({
  selector: 'app-environment-list',
  templateUrl: './environment-list.component.html',
  styleUrls: ['./environment-list.component.css']
})
export class EnvironmentListComponent implements OnInit {
  public environments: Environment[];
  showDeleteDialog = false;
  selectedEnvironment: Environment;

  constructor(private router: Router,
              private httpConfig: HttpConfigService) {
  }

  ngOnInit() {

    this.httpConfig.loadConfig().subscribe(configData => {
      ConfigdataService.setConfig(configData);
      this.environments = ConfigdataService.getEnvironmentList();
      this.selectedEnvironment = ConfigFactory.createEnvironment();
    });

  };


  onShowConfirmDelete(envId) {
    this.showDeleteDialog = true;

    this.selectedEnvironment = ConfigdataService.getEnvironment(envId);

  }

  onDeleteConfirm() {
    this.showDeleteDialog = false;

    if (this.selectedEnvironment) {
      this.environments = ConfigdataService.deleteEnvironment(this.selectedEnvironment);
      this.httpConfig.saveConfig(ConfigdataService.getConfig())

    }

  } ;

  onExportYaml(envId){
    this.selectedEnvironment = ConfigdataService.getEnvironment(envId);
    this.httpConfig.exportYaml(this.selectedEnvironment);

  }

}
