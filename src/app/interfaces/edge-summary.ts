export interface EdgeSummary {
  id: string;

  edge_group: string;

  typeGG: boolean;
  typeAzure: boolean

  cluster_id: string;
  vcenter_cluster: string;

  vcenter_datacenter: string;
  vcenter_datastore: string;
  vcenter_rp: string;
  vcenter_insecure: boolean;

  vcenter_id: string;
  vcenter_name: string;

  vcenter_host: URL;

  ntpservers: string;
  dnsserver: string;
  dnsdomain: string;
  defaultgateway: string;
  netmask: string;

  env_id: string;
  env_name: string;

}
