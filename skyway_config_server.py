import json
from flask import Flask, request, jsonify
from flask_cors import CORS

portNum = "4201"
configFileName = "skyway-config-ui.json"

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
    response = json.load(configFile)
    # print ("Response Payload:", response)
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
    json.dump(content, configFile)
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
    yamlFile = open(filename, mode='w', encoding='utf-8')
    # TODO Convert contents of env to yaml format
    yaml = convertJsonToYaml(content)
    yamlFile.write(yaml)
    yamlFile.close()
  except IOError:
    print("Error opening file:" + yamlFile)


  return jsonify({"response": "OK"})


def convertJsonToYaml(json):
    yaml = ""
    yaml += json['name']

    return yaml



  #######################################
# Run the App
if __name__ == '__main__':
  app.run(port=portNum)
