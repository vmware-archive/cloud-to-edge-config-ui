import json
from flask import Flask, request, jsonify
from flask_cors import CORS
import yaml

portNum = "4201"
configFileName = "skyway-config-ui.yml"

app = Flask(__name__)
cors = CORS(app)



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

    #response = json.load(configFile)

    response = yaml.load(configFile)

    print ("Response Payload:", response)

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

    # json.dump(content, configFile)
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

    if 'skyway_installer' in json:
      ex['skyway_installer'] = json['skyway_installer']
    else:
      ex['skyway_installer'] = "skyway-concourse"


    if 'skyway_edge_deploy_size' in json:
      ex['skyway_edge_deploy_size'] = json['skyway_edge_deploy_size']
    else:
      ex['skyway_edge_deploy_size'] = "small"


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
    ex['skyway_edge_vm_basename'] = json['skyway_edge_vm_basename']
    ex['skyway_edge_vm_user'] = json['skyway_edge_vm_user']
    ex['skyway_edge_vm_password'] = json['skyway_edge_vm_password']
    ex['skyway_edge_vm_network'] = json['skyway_edge_vm_network']
    ex['skyway_edge_vm_ssh_priv_key'] = json['skyway_edge_vm_ssh_priv_key']
    ex['skyway_edge_vm_ssh_pub_key'] = json['skyway_edge_vm_ssh_pub_key']

    ex['skyway_edges'] = []

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
          ex['skyway_edges'].append(edgeGroup)

          if 'typeGG' in cluster and  cluster['typeGG']:
            if 'greengrass_group_names' not in ex:
              ex['greengrass_group_names'] = []

            ex['greengrass_group_names'].append(edge['edge_group'])

            if 'greengrass_deploy' not in ex:
              ex['greengrass_deploy'] = {}

            ex['greengrass_deploy'][edge['edge_group']] = { 'redeploy': False, 'deploy': True}

            hasGreenGrass = True


    if hasGreenGrass:
      ex['aws_access_key'] = json['aws_access_key']
      ex['aws_secret_key'] = json['aws_secret_key']
      ex['greengrass_s3_bucket'] = json['greengrass_s3_bucket']
      ex['greengrass_device_stub'] = json['greengrass_device_stub']
      ex['greengrass_device_count'] = json['greengrass_device_count']


    return ex



  #######################################
# Run the App
if __name__ == '__main__':
  app.run(port=portNum)
