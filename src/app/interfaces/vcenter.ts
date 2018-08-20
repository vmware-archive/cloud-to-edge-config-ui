import {Cluster} from "./cluster";

export interface vCenter{
  id: string;
  name: string;

  host: URL;
  user: string;
  password: string;

  clusters: Cluster[]

}
