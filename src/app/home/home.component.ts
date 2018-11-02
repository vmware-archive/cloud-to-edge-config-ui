import { Component, OnInit } from '@angular/core';
import { ConfigdataService } from '../services/configdata.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public title = 'Cloud-to-Edge Configuration';
  public configData : object;


  constructor() { }

  ngOnInit() {


  }

}
