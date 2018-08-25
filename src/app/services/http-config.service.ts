import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs/index";
import {Environment} from "../interfaces/environment";

@Injectable({
  providedIn: 'root'
})
export class HttpConfigService {
  url = 'http://localhost:4201';

  httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  options = {
    headers: this.httpHeaders
  };

  constructor(private http: HttpClient) {

  }

  loadConfig(): Observable<object> {
    return this
      .http
      .get(`${this.url}/loadconfig`);
  }




  saveConfig(config) {
    console.log("saving...");

    return new Promise((resolve, reject) => {

      this.http.post(`${this.url}/saveconfig`, JSON.stringify(config), this.options)
        .subscribe(data => {
          console.log("...saving done");
          resolve(data);
        }, error => reject(error));
    });

  }


  exportYaml(env: Environment) {
    console.log("exporting yaml...");

    return new Promise((resolve, reject) => {

      this.http.post(`${this.url}/exportyaml`, JSON.stringify(env), this.options)
        .subscribe(data => {
          console.log("...export done");
          resolve(data);
        }, error => reject(error));
    });
  }
}
