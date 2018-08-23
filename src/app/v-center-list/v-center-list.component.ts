import { Component, OnInit } from '@angular/core';
import {ConfigdataService} from "../services/configdata.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Environment} from "../interfaces/environment";
import {vCenter} from "../interfaces/vcenter";
import {Cluster} from "../interfaces/cluster";
import {ConfigFactory} from "../classes/config-factory";

@Component({
  selector: 'app-v-center-list',
  templateUrl: './v-center-list.component.html',
  styleUrls: ['./v-center-list.component.css']
})
export class VCenterListComponent implements OnInit {
  private routerSub: any;
  environment: Environment;
  vcenters: vCenter[];
  selectedVCenter: vCenter;
  showDeleteDialog = false;


  constructor(private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {

    this.routerSub = this.route.params.subscribe(params => {
      let envId: string = params['envId']; // (+) converts string 'id' to a number

      this.environment = ConfigdataService.getEnvironment(envId);
      if(this.environment){
        this.vcenters = this.environment.vcenters;
      }
      this.selectedVCenter = ConfigFactory.createVCenter();

    });

  }



  onShowConfirmDelete(vcId){

    for(let i =0; i < this.vcenters.length; i++){
      if(this.vcenters[i].id == vcId){
        this.selectedVCenter = this.vcenters[i];
        break;
      }
    }
    this.showDeleteDialog = true;

  }

  onDeleteConfirm(){
    this.showDeleteDialog = false;

    if(this.selectedVCenter){
      this.vcenters = ConfigdataService.deleteVCenter(this.environment.id, this.selectedVCenter);
    }

  };



}

