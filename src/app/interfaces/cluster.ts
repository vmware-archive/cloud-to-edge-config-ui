import {Edge} from "./edge";

export interface Cluster {
  id: Number;
  name: String;
  "typeGG": true,
  "typeAzure": false,
  edges: Edge[];
}
