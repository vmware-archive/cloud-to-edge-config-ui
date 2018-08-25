import { Component, OnInit } from '@angular/core';
import { ConfigdataService } from '../services/configdata.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public title = 'Skyway';
  public configData : object;


  constructor() { }

  ngOnInit() {


  }

}
