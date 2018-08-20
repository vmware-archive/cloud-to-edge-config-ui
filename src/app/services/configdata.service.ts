import {Injectable} from '@angular/core';
import {Environment} from "../interfaces/environment";
import {Edge} from "../interfaces/edge";
import {vCenter} from "../interfaces/vcenter";
import {Cluster} from "../interfaces/cluster";

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
        vcenters: [
          {
            id: 8797,
            name: "vCenter UAT",
            host: "vcenter-01.lab.local",
            user: "administrator@vsphere.local",
            password: "VMware1!",
            clusters: [
              {
                id: 432,
                vcenter_cluster: "Management Cluster",
                "typeGG": true,
                "typeAzure": false,
                vcenter_datacenter: "West DC",
                vcenter_datastore: "Tier 1",
                vcenter_rp: "Mgmt RP",
                vcenter_insecure: true,
                edges: [
                  {
                    id: "9900",
                    edge_group: "Edge One"
                  },
                  {
                    id: "777",
                    edge_group: "Edge Two"
                  }
                ]
              },
              {
                id: 221,
                vcenter_cluster: "Workload Cluster",
                "typeGG": true,
                "typeAzure": false,
                vcenter_datacenter: "West DC",
                vcenter_datastore: "Tier 2",
                vcenter_rp: "Workload RP",
                vcenter_insecure: true,
                edges: [
                  {
                    id: "9903620",
                    edge_group: "Edge 1"
                  },
                  {
                    id: "3322",
                    edge_group: "Edge 2"
                  }
                ]
              }
            ]
          },
          {
            id: 24553,
            name: "vCenter Prod",
            host: "vcenter-01.corp.com",
            user: "administrator@vsphere.local",
            password: "VMware1!",
            clusters: []
          }

        ],
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


  static getEnvironment(envId: string): Environment {
    let environments = this.getEnvironmentList();
    for (let i = 0; i < environments.length; i++) {
      if (environments[i].id === envId) {
        return environments[i];
      }
    }
  }

  static setEnvironment(environment: Environment) {
    let environments = this.getEnvironmentList();
    for (let i = 0; i < environments.length; i++) {
      if (environments[i].id === environment.id) {
        environments[i] = environment;
        return
      }
    }
    if (!environment.id) {
      environment.id = this.getHashCode(environment.name);
    }
    environments.push(environment);
  }

  static getVCenter(envId: string, vcId: string): vCenter {
    let environment = ConfigdataService.getEnvironment(envId);
    let vcenters = environment.vcenters;
    for (let i = 0; i < vcenters.length; i++) {
      if (vcenters[i].id == vcId) {
        return vcenters[i];
      }
    }

  }

  static setVCenter(envId: string, vcenter: vCenter) {
    let environment = ConfigdataService.getEnvironment(envId);
    let vcenters = environment.vcenters;
    for (let i = 0; i < vcenters.length; i++) {
      if (vcenters[i].id == vcenter.id) {
        vcenters[i] = vcenter;
        return;
      }
    }
    if (!vcenter.id) {
      vcenter.id = this.getHashCode(vcenter.host.toString());
    }
    vcenters.push(vcenter);
  }

  static getCluster(envId: string, vcId: string, clusterId: string): Cluster {
    let vcenter = ConfigdataService.getVCenter(envId, vcId);
    let clusters = vcenter.clusters;
    for (let i = 0; i < clusters.length; i++) {
      if (clusters[i].id == clusterId) {
        return clusters[i];
      }
    }
  }

  static setCluster(envId: string, vcId: string, cluster: Cluster) {
    let vcenter = ConfigdataService.getVCenter(envId, vcId);
    let clusters = vcenter.clusters;
    for (let i = 0; i < clusters.length; i++) {
      if (clusters[i].id == cluster.id) {
        clusters[i] = cluster;
        return;
      }
    }
    if (!cluster.id) {
      cluster.id = this.getHashCode(cluster.vcenter_cluster);
    }
    clusters.push(cluster);
  }




  static getEdge(envId: string, vcId: string, clusterId: string, edgeId: string): Edge {
    let cluster = ConfigdataService.getCluster(envId, vcId, clusterId);
    let edges = cluster.edges;
    for (let i = 0; i < edges.length; i++) {
      if (edges[i].id == edgeId) {
        return edges[i];
      }
    }
  }

  static setEdge(envId: string, vcId: string, clusterId: string, edge: Edge) {
    let cluster = ConfigdataService.getCluster(envId, vcId, clusterId);
    let edges = cluster.edges;
    for (let i = 0; i < edges.length; i++) {
      if (edges[i].id == edge.id) {
        edges[i] = edge;
        return;
      }
    }
    if (!edge.id) {
      edge.id = this.getHashCode(edge.edge_group);
    }
    edges.push(edge);
  }

  static getHashCode(str: string): string {
    var hash = 0, i, chr;
    if (str.length === 0) {
      return hash.toString(10);
    }

    for (i = 0; i < str.length; i++) {
      chr = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + chr;
      hash |= 0; // Convert to 32bit integer
    }
    return hash.toString(10);
  };
}
