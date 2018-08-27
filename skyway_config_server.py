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
    yaml = ""
    yaml += json['name']

    return json;



  #######################################
# Run the App
if __name__ == '__main__':
  app.run(port=portNum)
