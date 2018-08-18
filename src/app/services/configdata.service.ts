import {Injectable} from '@angular/core';
import {Environment} from "../interfaces/environment";
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
        "name": "Deployment South",
        "id": "98327320982",
        "deployUniform": true,
        "deployCustom": false,
        "typeGG": true,
        "typeAzure": false,
        "ftStandard": true,
        "ftNoDown": true,
        "location": "Austin",
        "contact": "Steven Eff",
        "clusters": [
          {
            "name": "ManagementCluster",
            "id": "443335",
            "edges": [
              {
                "name": "EdgeOne"
              },
              {
                "name": "EdgeTwo"
              }
            ]
          },
          {
            "name": "WorkloadCluster",
            "id": "112233",
            "edges": []

          }
        ]
      },
      {
        "name": "Deployment West",
        "id": "213243242",
        "deployUniform": false,
        "deployCustom": true,
        "typeGG": true,
        "typeAzure": true,
        "ftStandard": true,
        "ftNoDown": true,
        "location": "Area 51",
        "contact": "Grey Eye",
        "clusters": [
          {
            "name": "ManagementCluster",
            "id": "88776",
            "edges": [
              {
                "name": "AnotherEdge"
              }
            ]
          }
        ]
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

  static getEnvironment(id): Environment {
    let environments = ConfigdataService.getEnvironmentList();

    for (let i = 0; i < environments.length; i++) {
      if (Number(environments[i].id) === id) {
        return environments[i];
      }
    }
    return null;
  }

  static getCluster(envId, clusterId): Cluster {
    let environment: Environment = ConfigdataService.getEnvironment(envId);
    let clusters: Cluster[] = environment.clusters;

    for (let i = 0; i < clusters.length; i++) {
      if (Number(clusters[i].id) === clusterId) {
        return clusters[i];
      }
    }
    return null;
  }

  static getClusterCount(envId): number {
    let environments = ConfigdataService.getEnvironmentList();

    for (let i = 0; i < environments.length; i++) {
      if (environments[i].id === envId) {
        let clusters: Cluster[] = environments[i].clusters;
        return clusters.length;
      }
    }
    return 0;
  }

  static getEdgeCount(envId, clusterId): number {
    try {
      let cluster: Cluster = ConfigdataService.getCluster(envId, clusterId);
      let edgeCount = cluster.edges.length;

      return edgeCount
    } catch {
      return 0;
    }
  }

  static getCluster2(envId, clusterId): number {
    try {
      let cluster: Cluster = ConfigdataService.getCluster(envId, clusterId);
      let edgeCount = cluster.edges.length;

      return edgeCount
    } catch {
      return 0;
    }
  }


}
