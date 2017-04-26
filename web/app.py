from flask import Flask, jsonify, render_template, request
import json
import MySQLdb
db = MySQLdb.connect("mobike.celsjntapdmx.us-west-2.rds.amazonaws.com","YYY","mypassword","mobike" )
cursor = db.cursor()

app = Flask(__name__)


data0 = [
        { 'field1': 'value a1', 'field2': 'value a2', 'field3': 'value a3', 'field4': 'value a4' ,'field5': 'value a1', 'field6': 'value a2', 'field7': 'value a3', 'field8': 'value a4','field9': 'value a4'},
        { 'field1': 'value a1', 'field2': 'value a2', 'field3': 'value a3', 'field4': 'value a4' ,'field5': 'value a1', 'field6': 'value a2', 'field7': 'value a3', 'field8': 'value a4','field9': 'value a4'}
        ]

data5 = [
        { 'field1': 'value a15', 'field2': 'value a2', 'field3': 'value a35', 'field4': 'value a45' ,'field5': 'value a55', 'field6': 'value a65', 'field7': 'value a75', 'field8': 'value a85','field9': 'value a95'},
        { 'field1': 'value a15', 'field2': 'value a2', 'field3': 'value a35', 'field4': 'value a45' ,'field5': 'value a55', 'field6': 'value a65', 'field7': 'value a75', 'field8': 'value a85','field9': 'value a95'},
        { 'field1': 'value a1', 'field2': 'value a2', 'field3': 'value a3', 'field4': 'value a4' ,'field5': 'value a1', 'field6': 'value a2', 'field7': 'value a3', 'field8': 'value a4','field9': 'value a4'}
        ]

test = { 'field1': 'value a1', 'field2': 'value a2', 'field3': 'value a3', 'field4': 'value a4' ,'field5': 'value a1', 'field6': 'value a2', 'field7': 'value a3', 'field8': 'value a4','field9': 'value a4'}
 

# json.dumps(data0)
# jsonify(test)
# for i in range (2):
#     jsonify(data0[i])

@app.route('/tablePos', methods=['POST'])
def tablePos():
    
    count =  request.form["num"]
    print count
    if (count == 'true'):
        data = data0
        print "truedata"
    else:
        data = data5
        print "falsedata"
    return json.dumps(data)
    
@app.route('/')
def index():
    return render_template('index.html')

if __name__ == '__main__':
    app.debug=True
    app.run(host='localhost',port = 5000)


