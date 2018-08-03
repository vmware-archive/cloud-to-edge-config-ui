import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigdataService {

  constructor() {
  }

  static configData : object = { value: "somesample data"};

  get data() : object{
    return ConfigdataService.configData;
  }

  set data(configData: object){
    ConfigdataService.configData = configData;
  }



}
