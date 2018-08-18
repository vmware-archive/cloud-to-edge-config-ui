export interface Azure{

  // Azure auth settings
  azure_cli_application_id: string;
  azure_cli_application_key: string;
  azure_cli_tenant_id: string;

  // Name of the IoT hub
  azure_iot_hub_name: string;

  // Group to contain the IoT resources (will be created).
  azure_iot_group: string;


}
