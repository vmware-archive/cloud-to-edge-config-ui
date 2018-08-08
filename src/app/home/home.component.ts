import { Component, OnInit } from '@angular/core';
import { ConfigdataService } from '../services/configdata.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title = 'Skyway';

  public configData : object;

  constructor(private configDataService: ConfigdataService) { }

  ngOnInit() {
    this.configData = this.configDataService.data;
  }

}
