import {Edge} from "../interfaces/edge";
import {Environment} from "../interfaces/environment";
import {Cluster} from "../interfaces/cluster";
import {vCenter} from "../interfaces/vcenter";
import {EdgeSummary} from "../interfaces/edge-summary";

export class ConfigFactory {


  static createEdgeInfo(environment: Environment, vcenter: vCenter, cluster: Cluster, edge: Edge): EdgeSummary {
    return {

      id: edge.id,

    edge_group: edge.edge_group,

      // TODO: add logic to check for null and get it from env
    typeGG: edge.typeGG,
    typeAzure: edge.typeAzure,

    cluster_id: cluster.id,
    vcenter_cluster: cluster.vcenter_cluster,

    vcenter_datacenter: cluster.vcenter_datacenter,
    vcenter_datastore: cluster.vcenter_datastore,
    vcenter_rp: cluster.vcenter_rp,
    vcenter_insecure: cluster.vcenter_insecure,

    vcenter_id: vcenter.id,
    vcenter_name: vcenter.name,

    vcenter_host: vcenter.host,

    ntpservers: environment.ntpservers,
    dnsserver: environment.dnsserver,
    dnsdomain: environment.dnsdomain,
    defaultgateway: environment.defaultgateway,
    netmask: environment.netmask,

    env_id: environment.id,
    env_name: environment.name

  };
  }

  static createEdge(environment: Environment): Edge {
    return {
      id: "",
      edge_group: "",
      typeGG: environment.typeGG,
      typeAzure: environment.typeAzure
    };
  }

  static createCluster(): Cluster {
    return {
      id: "",
      vcenter_cluster: "",
      vcenter_datacenter: "",
      vcenter_datastore: "",
      vcenter_rp: "",
      vcenter_insecure: true,
      edges: []
    };
  }

  static createVCenter(): vCenter {
    let url = new URL("http://localhost");
    return {
      id: "",
      name: "",
      host: url,
      user: "",
      password: "",
      clusters: []
    };
  }

  static createEnvironment(): Environment {

    return {
      id: "",
      name: "",
      deployUniform: true,
      deployCustom: false,
      typeGG: true,
      typeAzure: false,
      ftStandard: true,
      ftNoDown: false,
      location: "",
      contact: "",
      vcenters: [],
      git_key: "",
      ntpservers: "",
      dnsserver: "",
      dnsdomain: "",
      defaultgateway: "",
      netmask: "",
      binary_webserver: "",
      base_ova_name: "",
      base_ova_name_arm: "",
      ovftool_image: "",
      skyway_edge_vm_basename: "",
      skyway_edge_vm_user: "",
      skyway_edge_vm_password: "",
      skyway_edge_vm_network: "",
      skyway_edge_vm_ssh_priv_key: "",
      skyway_edge_vm_ssh_pub_key: "",
      azure_cli_application_id: "",
      azure_cli_application_key: "",
      azure_cli_tenant_id: "",
      azure_iot_hub_name: "",
      azure_iot_group: "",
      aws_access_key: "",
      aws_secret_key: "",
      greengrass_s3_bucket: "",
      greengrass_device_stub: "",
      greengrass_device_count: 1

    };
  }
}
