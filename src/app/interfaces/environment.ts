import {vCenter} from "./vcenter";

export interface Environment {
  id: string;
  name: string;
  deployUniform: boolean;
  deployCustom: boolean;
  typeGG: boolean;
  typeAzure: boolean
  ftStandard: boolean;
  ftNoDown: boolean
  location: string;
  contact: string;
  vcenters: vCenter[];


  git_key: string;

  // OVA general network settings
  ntpservers: string;
  dnsserver: string;
  dnsdomain: string;
  defaultgateway: string;
  netmask: string;

  // Host a Webserver to serve the ova images and ovftool
  // Please edit the endpoint and the file names
  binary_webserver: string;

  // Download base ova, e.g.
  // https://cloud-images.ubuntu.com/xenial/current/xenial-server-cloudimg-amd64.ova
  base_ova_name: string;
  base_ova_name_arm: string;

  // Ensure ovftool is minimally v4.2
  // https://my.vmware.com/group/vmware/details?productId=614&downloadGroup=OVFTOOL420//
  ovftool_image: string;

  // Stub for edge VM names: will become [edge_vm_basename]-[edge_group]
  skyway_edge_vm_basename: string;

  // Default credentials to add to Edge VMs
  skyway_edge_vm_user: string;
  skyway_edge_vm_password: string;

  // This will serve as a default if no specific network is provided in
  // skway_edges
  skyway_edge_vm_network: string;

  // Private key for connecting to Edge VMs.  If set, should correspond to the
  // pub key below
  skyway_edge_vm_ssh_priv_key: string;
  skyway_edge_vm_ssh_pub_key: string;

  // Azure auth settings
  azure_cli_application_id: string;
  azure_cli_application_key: string;
  azure_cli_tenant_id: string;

  // Name of the IoT hub
  azure_iot_hub_name: string;

  // Group to contain the IoT resources (will be created).
  azure_iot_group: string;

  // AWS auth settings
  aws_access_key: string;
  aws_secret_key: string;

  // AWS Greengrass settings
  // This S3 bucket is used to store credentials, lambda code, etc.
  greengrass_s3_bucket: string;


  // The role will create devices of the form {greengrass_device_stub}N, where N
// is between 1 and greengrass_device_count.
// These can be left undefined if no devices should be mass-created this way.
  greengrass_device_stub: string;
  greengrass_device_count: number;

}

