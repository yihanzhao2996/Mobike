from flask import Flask, jsonify, render_template, request
import json
import MySQLdb
# db = MySQLdb.connect("mobike.celsjntapdmx.us-west-2.rds.amazonaws.com","YYY","mypassword","mobike" )
db = MySQLdb.connect("localhost","root","","mobike" )

cursor = db.cursor()
def searchMapGroup(group):
    res = []
    db.select_db('mobike')
    sql = "SELECT * FROM heatmap WHERE result_id = '%d'" % (group)
    cursor.execute(sql)
    datas =  cursor.fetchmany(size=100)
    for i in range (len(datas)):
        lat = datas[i][4]
        lng = datas[i][5]
        res.append({"lat": lat , "lng": lng})

    print res
    return res






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



app = Flask(__name__)

@app.route('/mapPos', methods=['POST'])
def mapPos():
    
    group =  int(request.form["num"])
    res = searchMapGroup(group)
    return json.dumps(res)


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


