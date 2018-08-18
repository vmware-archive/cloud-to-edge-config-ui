import { Component, OnInit } from '@angular/core';
import { ConfigdataService } from '../services/configdata.service';
import {Environment} from "../interfaces/environment";

@Component({
  selector: 'app-environment-list',
  templateUrl: './environment-list.component.html',
  styleUrls: ['./environment-list.component.css']
})
export class EnvironmentListComponent implements OnInit {
  public environments : Environment[];

  constructor() { }

  ngOnInit() {
    this.environments = ConfigdataService.getEnvironmentList();

  }


}
