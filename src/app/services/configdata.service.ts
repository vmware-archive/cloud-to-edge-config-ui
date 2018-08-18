import {Injectable} from '@angular/core';
import {Environment} from "../interfaces/environment";

@Injectable({
  providedIn: 'root'
})


export class ConfigdataService {

  constructor() {
  }

  static configData: object = {
    "environments": [
      {
        id: "123",
        name: "Deploy West",
        deployUniform: true,
        deployCustom: false,
        typeGG: true,
        typeAzure: true,
        ftStandard: true,
        ftNoDown: false,
        location: "Area 51",
        contact: "Gray Eye",
        vcenters: [],
        git_key: "0&^%&$675*&%^&*^$^&*58",
        ntpservers: "10.13.12.2",
        dnsserver: "10.13.12.2",
        dnsdomain: "corp.local.io",
        defaultgateway: "10.13.12.1 ",
        netmask: "255.255.255.0",
        binary_webserver: "http://192.168.120.40",
        base_ova_name: "xenial-server-cloudimg-amd64.ova",
        base_ova_name_arm: "xenial-server-cloudimg-arm64.ova",
        ovftool_image: "VMware-ovftool-4.3.0-7948156-lin.x86_64.bundle",
        skyway_edge_vm_basename: "edgevm",
        skyway_edge_vm_user: "edgevm",
        skyway_edge_vm_password: "skyway-passZ!",
        skyway_edge_vm_network: "VM-RegionA01-vDS-COMP",
        skyway_edge_vm_ssh_priv_key: "MIIEpAIBAAKCAQE",
        skyway_edge_vm_ssh_pub_key: "QrbqK+twcjz3Ity"
      }

    ]
  };

  static setConfig(config) {
    ConfigdataService.configData = config;
  }

  static getConfig(): object {
    return ConfigdataService.configData;
  }


  static getEnvironmentList(): Environment[] {
    let configData: any = ConfigdataService.configData;
    return configData.environments;

  }


  static getEnvironment(envId: string) {
    let environments = this.getEnvironmentList();
    for(let i = 0; i < environments.length; i++){
      if(environments[i].id === envId){
        return environments[i];
      }
    }

  }
}
