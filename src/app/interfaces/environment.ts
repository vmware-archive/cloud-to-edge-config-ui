import {Cluster} from "./cluster";

export interface Environment {
  id: Number;
  name: String;
  deployUniform: Boolean;
  deployCustom: Boolean;
  typeGG: Boolean;
  typeAzure: Boolean
  ftStandard: Boolean;
  ftNoDown: Boolean
  location: String;
  contact: String;
  clusters: Cluster[];
}
