import json
from flask import Flask
from flask import Response, request, jsonify

port = "4201"



app = Flask(__name__)

#######################################
#Default route redirected to 'path'
@app.route('/', defaults={'path': ''})


#######################################
#Catch all for GET Requests
@app.route('/<path:path>', methods=['GET'])
def catchGetMethods(path):

  value = [
    {"search": "authenticate", "response": "{\"token\":\"TOKABC123\"}"},
    {"search": "uwe", "response": "whoohoo"},
    {"search": "xyz/abc/123", "response": "xy ab 12"}
  ]
  for searchString in value:
    if searchString["search"] in path:
      return Response(searchString["response"], status=200, mimetype='application/json')

  return Response(json.dumps({"ERROR": "No Matching URL Found"}), status=404, mimetype='application/json')


#######################################
# Expected JSON POST Payload: {"username": "sysadmin", "password": "Sysadmin?123", "clientContext": 1}
# Expected Header:
#   Content-Type = "application/json"

# Response: concatenated username and password
@app.route('/authenticate', methods=['POST'])
def authenticate():
  content = request.get_json(silent = True)
  print ("Request Payload:", content)
  response = { "token": content["username"] + content["password"]}
  print ("Response Payload:", response)

  return jsonify(response)

#######################################
# Expected JSON POST Payload: use anything you want
# Expected Headers:
#   Content-Type = "application/json"
#   Authorization = "Bearer tokenvalue"
@app.route('/test', methods=['POST'])
def test():
  content = request.get_json(silent = True)
  print ("Request Payload:", content)

  authHeader = request.headers["Authorization"]
  token = authHeader.split(" ", 1)

  if token[0] != "Bearer":
    return Response(json.dumps({"ERROR": "No Authorization 'Bearer' value Found"}), status=401, mimetype='application/json')

  print ("Token:", token[1])

  response = { "response": "The authorization token was:" + str(token[1])}
  print ("Response Payload:", response)

  return jsonify(response)

#######################################
# Run the App
if __name__ == '__main__':
  app.run(port=port)
