import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {ConfigdataService} from "../services/configdata.service";


@Component({
  selector: 'app-load-config',
  templateUrl: './load-config.component.html',
  styleUrls: ['./load-config.component.css']
})
export class LoadConfigComponent implements OnInit {
  configData = "";
  formatType = "javascript";


  constructor(private router: Router  ) {
  }

  ngOnInit() {
    this.configData = JSON.stringify(ConfigdataService.getConfig());


  }

  saveJavascript(){
    ConfigdataService.setConfig(JSON.parse(this.configData));
  }

  saveYaml(){
alert("YAML is not yet supported");
  }

  saveCsv(){
    alert("CSV is not yet supported");
  }


  onSubmit(){
    switch (this.formatType){
      case "javascript":
        this.saveJavascript();
        break;
      case "yaml":
        this.saveYaml();
        break;
      case "csv":
        this.saveCsv();
        break;

    }

    this.router.navigateByUrl("environmentlist");
  }

  buttonCancel(){
    this.router.navigateByUrl("home");

  }

  buttonExport() {
    alert("TODO");
  }
}
