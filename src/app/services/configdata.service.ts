import {Environment} from "../interfaces/environment";
import {Edge} from "../interfaces/edge";
import {vCenter} from "../interfaces/vcenter";
import {Cluster} from "../interfaces/cluster";
import {HttpConfigService} from "./http-config.service";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})


export class ConfigdataService {

  constructor(httpConfig: HttpConfigService) {
  }

  static configData: object = {environments: []};



  static setConfig(config: object) {

    ConfigdataService.configData = config;
  }

  static getConfig(): object {
    return ConfigdataService.configData;
  }


  static setConfigString(config: string) {
    ConfigdataService.configData = JSON.parse(config);

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


  static deleteEnvironment(deleteEnvironment: Environment): Environment[] {
    let environments = this.getEnvironmentList();
    for (let i = 0; i < environments.length; i++) {
      if (environments[i].id === deleteEnvironment.id) {
        environments.splice(i, 1);
        break;
      }
    }
    return this.getEnvironmentList();
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

  static deleteVCenter(envId: string, vcenter: vCenter): vCenter[] {
    let environment = ConfigdataService.getEnvironment(envId);
    let vcenters = environment.vcenters;
    for (let i = 0; i < vcenters.length; i++) {
      if (vcenters[i].id == vcenter.id) {
        vcenters.splice(i, 1);
        break;
      }
    }
    return vcenters
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

  static deleteCluster(envId: string, vcId: string, selectedCluster: Cluster): Cluster[] {
    let vcenter = ConfigdataService.getVCenter(envId, vcId);
    let clusters = vcenter.clusters;
    for (let i = 0; i < clusters.length; i++) {
      if (clusters[i].id == selectedCluster.id) {
        clusters.splice(i, 1);
        break;
      }
    }
    return clusters
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

  static deleteEdge(envId: string, vcId: string, clusterId: string, edge: Edge): Edge[] {
    let cluster = ConfigdataService.getCluster(envId, vcId, clusterId);
    let edges = cluster.edges;
    for (let i = 0; i < edges.length; i++) {
      if (edges[i].id == edge.id) {
        edges.splice(i, 1);
        break;
      }
    }
    return edges;
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
