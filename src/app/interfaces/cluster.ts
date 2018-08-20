import {Edge} from "./edge";

export interface Cluster {
  id: string;
  vcenter_cluster: string;
  "typeGG": true;
  "typeAzure": false;


  vcenter_datacenter: string;
  vcenter_datastore: string;
  vcenter_rp: string;
  vcenter_insecure: boolean;

  edges: Edge[];
}
