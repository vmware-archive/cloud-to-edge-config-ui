from flask import Flask, request, jsonify
from flask_cors import CORS
import yaml

configFileName = "cloud-to-edge-config-ui.yml"

app = Flask(__name__)
cors = CORS(app)

from SkywayDB import DB


def runServer(portNum):
  app.run(port=portNum)


#######################################
@app.route("/")
def helloWorld():
  return "Hello, cross-origin-world!"


#######################################


# Response: concatenated username and password
@app.route('/loadconfig', methods=['GET'])
def loadConfig():
  response = {}
  try:
    configFile = open(configFileName, mode='r', encoding='utf-8')

    response = yaml.load(configFile)

    #print ("Response Payload:", response)

    configFile.close()
  except IOError:
    print("Error opening file:" + configFileName)

  return jsonify(response)


@app.route('/saveconfig', methods=['POST'])
def saveConfig():

  content = request.get_json()
  #print ("Request Payload:", content)
  try:
    configFile = open(configFileName, mode='w', encoding='utf-8')

    yaml.dump(content, configFile, default_flow_style=False)


    configFile.close()
  except IOError:
    print("Error opening file:" + configFileName)


  return jsonify({"response": "OK"})


@app.route('/exportyaml', methods=['POST'])
def exportYaml():

  content = request.get_json(force=True)
  #print ("YAML Content:", content)

  filename = content['name'] + "-" + content['id'] + ".yml"
  print ("YAML File:", filename)
  try:
    yamlContent = convertToExportStructure(content)

    with open(filename, 'w') as yamlFile:
      yaml.dump(yamlContent, yamlFile, default_flow_style=False)
    yamlFile.close()

  except IOError:
    print("Error opening file:" + yamlFile)


  return jsonify({"response": "OK"})


def convertToExportStructure(json):
    ex = {}


    if 'enable_ansible_debug' in json:
      ex['enable_ansible_debug'] = json['enable_ansible_debug']
    else:
      ex['enable_ansible_debug'] = "false"

    if 'c2e_installer' in json:
      ex['c2e_installer'] = json['c2e_installer']
    else:
      ex['c2e_installer'] = "cloud-to-edge-concourse"


    if 'c2e_edge_deploy_size' in json:
      ex['c2e_edge_deploy_size'] = json['c2e_edge_deploy_size']
    else:
      ex['c2e_edge_deploy_size'] = "small"


    ex['git_key'] = json['git_key']
    ex['ntpservers'] = json['ntpservers']
    ex['dnsserver'] = json['dnsserver']
    ex['dnsdomain'] = json['dnsdomain']
    ex['defaultgateway'] = json['defaultgateway']
    ex['netmask'] = json['netmask']
    ex['binary_webserver'] = json['binary_webserver']
    ex['base_ova_name'] = json['base_ova_name']
    ex['base_ova_name_arm'] = json['base_ova_name_arm']
    ex['ovftool_image'] = json['ovftool_image']
    ex['c2e_edge_vm_basename'] = json['c2e_edge_vm_basename']
    ex['c2e_edge_vm_user'] = json['c2e_edge_vm_user']
    ex['c2e_edge_vm_password'] = json['c2e_edge_vm_password']
    ex['c2e_edge_vm_network'] = json['c2e_edge_vm_network']
    ex['c2e_edge_vm_ssh_priv_key'] = json['c2e_edge_vm_ssh_priv_key']
    ex['c2e_edge_vm_ssh_pub_key'] = json['c2e_edge_vm_ssh_pub_key']
    ex['typeAzure'] = json['typeAzure']
    ex['typeGG'] = json['typeGG']

    ex['c2e_edges'] = []

    hasGreenGrass = False
    hasAzure = False

    for vcenter in json['vcenters']:
      for cluster in vcenter['clusters']:
        for edge in cluster['edges']:
          edgeGroup = {}
          edgeGroup['edge_group'] = edge['edge_group']
          edgeGroup['vcenter_host'] = vcenter['host']
          edgeGroup['vcenter_usr'] = vcenter['user']
          edgeGroup['vcenter_pwd'] = vcenter['password']
          edgeGroup['vcenter_datacenter'] = cluster['vcenter_cluster']
          edgeGroup['vcenter_datastore'] = cluster['vcenter_datastore']
          edgeGroup['vcenter_cluster'] = cluster['vcenter_cluster']
          edgeGroup['vcenter_rp'] = cluster['vcenter_rp']
          edgeGroup['vcenter_insecure'] = cluster['vcenter_insecure']
          ex['c2e_edges'].append(edgeGroup)

          if 'typeGG' in ex and  ex['typeGG']:
            if 'greengrass_group_names' not in ex:
              ex['greengrass_group_names'] = []

            ex['greengrass_group_names'].append(edge['edge_group'])

            if 'greengrass_deploy' not in ex:
              ex['greengrass_deploy'] = {}

            ex['greengrass_deploy'][edge['edge_group']] = { 'redeploy': False, 'deploy': True}

            hasGreenGrass = True


          if 'typeAzure' in ex and  ex['typeAzure']:
            if 'azure_iot_edge_names' not in ex:
              ex['azure_iot_edge_names'] = []

            ex['azure_iot_edge_names'].append(edge['edge_group'])

            hasAzure = True


    if hasGreenGrass:
      ex['aws_access_key'] = json['aws_access_key']
      ex['aws_secret_key'] = json['aws_secret_key']
      ex['greengrass_s3_bucket'] = json['greengrass_s3_bucket']
      ex['greengrass_device_stub'] = json['greengrass_device_stub']
      ex['greengrass_device_count'] = json['greengrass_device_count']

    if(hasAzure):
      ex['azure_cli_application_id'] = json['azure_cli_application_id']
      ex['azure_cli_application_key'] = json['azure_cli_application_key']
      ex['azure_cli_tenant_id'] = json['azure_cli_tenant_id']
      ex['azure_iot_hub_name'] = json['azure_iot_hub_name']
      ex['azure_iot_group'] = json['azure_iot_group']

    return ex
