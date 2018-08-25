import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ConfigdataService} from "../services/configdata.service";
import {HttpConfigService} from "../services/http-config.service";


@Component({
  selector: 'app-load-config',
  templateUrl: './load-config.component.html',
  styleUrls: ['./load-config.component.css']
})
export class LoadConfigComponent implements OnInit {
  configData = "";


  constructor(private router: Router, private httpConfig: HttpConfigService) {
  }

  ngOnInit() {

    this.httpConfig.loadConfig().subscribe(configData => {
      ConfigdataService.setConfig(configData);
      this.configData = JSON.stringify(ConfigdataService.getConfig());

    });


  }

  saveJavascript() {
    ConfigdataService.setConfigString(this.configData);
    this.httpConfig.saveConfig(ConfigdataService.getConfig())
  }


  onSubmit() {
    this.saveJavascript();

    this.router.navigateByUrl("environmentlist");
  }

  buttonCancel() {
    this.router.navigateByUrl("home");

  }

  buttonExport() {
    alert("TODO");
  }
}
