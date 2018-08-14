import {Cluster} from "./cluster";

export interface Environment {
  id: Number;
  name: String;
  location: String;
  contact: String;
  clusters: Cluster[];
}
