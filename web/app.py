from flask import Flask, jsonify, render_template, request
import json
import MySQLdb

db = MySQLdb.connect("localhost","root","","mobike" )
db2 = MySQLdb.connect("citibike.coyfwaoyaky7.us-east-2.rds.amazonaws.com","YYY","mypasswordyyy","citibike" )

cursor = db.cursor()
cursor2 = db2.cursor()

def searchMapGroup(group):
    res = []
    db.select_db('mobike')
    sql = "SELECT * FROM heatmap WHERE result_id = '%d'" % (group) 
    cursor.execute(sql)
    datas =  cursor.fetchall()
    for i in range (len(datas)):
        lat = datas[i][4]
        lng = datas[i][5]
        res.append({"lat": lat , "lng": lng})

    # print res
    return res
def searchTable():
    print "XXXXXXXXXXXX"
    res = []
    db2.select_db('citibike')
    sql = "SELECT * FROM bike_usage" 
    cursor2.execute(sql)
    datas =  cursor2.fetchmany(size=15)
    for i in range (len(datas)):
        res.append({ 'field1': str(datas[i][2]), 'field2': str(datas[i][3]), 'field3': str(datas[i][4]), 'field4': str(datas[i][5]), 'field5': str(datas[i][6]), 'field6': str(datas[i][3]/datas[i][4])})
    # print res
    return res

def cityStation():
    res = []
    db2.select_db('citibike')
    sql = "SELECT * FROM stations" 
    cursor2.execute(sql)
    datas =  cursor2.fetchall()
    for i in range (len(datas)):
        s_id = datas[i][0]
        lat = datas[i][1]
        lng = datas[i][2]
        add = datas[i][3]
        res.append({"s_id ":s_id,"lat": lat , "lng": lng,"add":add })
    # print res
    return res

def cityIn(num):
    res = []
    db2.select_db('citibike')
    # station id join lat lng
    sql = "SELECT * FROM heatmap JOIN stations on stations.station_id = heatmap.station_id WHERE in_out = '1' and time_slot = '%d'" % (num) 
    cursor2.execute(sql)
    datas =  cursor2.fetchall()
     
    for i in range (len(datas)):
   # data number change
        lat = datas[i][6]
        lng = datas[i][7]
        count = int(datas[i][4])
        time = int(datas[i][2])
        res.append({"lat": lat , "lng": lng, "count":count ,"time":time})
    # print res
    return res

def cityOut(num):
    res = []
    db2.select_db('citibike')
    # station id join lat lng
    sql ="SELECT * FROM heatmap JOIN stations on stations.station_id = heatmap.station_id WHERE in_out = '0' and time_slot = '%d'" % (num)
    cursor2.execute(sql)
    datas =  cursor2.fetchall()
    for i in range (len(datas)):
   # data number change
        lat = datas[i][6]
        lng = datas[i][7]
        count = int(datas[i][4])
        time = int(datas[i][2])
        res.append({"lat": lat , "lng": lng, "count":count ,"time":time})
    print res
    return res

# def searchCityMap(num):
#     res = []
#     db2.select_db('citibike')
#     sql = "SELECT * FROM heatmap WHERE heat_id = '%d'" % (num)
#     cursor2.execute(sql)
#     datas =  cursor2.fetchall()
#     print datas
#     # for i in range (len(datas)):
#     #     lat = datas[i][4]
#     #     lng = datas[i][5]
#     #     res.append({"lat": lat , "lng": lng})

#     # print res
#     # return res

# searchCityMap(1)




# data0 = [
#         { 'field1': 'value a1', 'field2': 'value a2', 'field3': 'value a3', 'field4': 'value a4' ,'field5': 'value a1', 'field6': 'value a2', 'field7': 'value a3', 'field8': 'value a4','field9': 'value a4'},
#         { 'field1': 'value a1', 'field2': 'value a2', 'field3': 'value a3', 'field4': 'value a4' ,'field5': 'value a1', 'field6': 'value a2', 'field7': 'value a3', 'field8': 'value a4','field9': 'value a4'}
#         ]

# data5 = [
#         { 'field1': ' a15', 'field2': 'value a2', 'field3': 'value a35', 'field4': 'value a45' ,'field5': 'value a55', 'field6': 'value a65', 'field7': 'value a75', 'field8': 'value a85','field9': 'value a95'},
#         { 'field1': ' a15', 'field2': 'value a2', 'field3': 'value a35', 'field4': 'value a45' ,'field5': 'value a55', 'field6': 'value a65', 'field7': 'value a75', 'field8': 'value a85','field9': 'value a95'}
        
#         ]





app = Flask(__name__)
@app.route('/cityinPos', methods=['POST'])
def cityinPos(): 
    num =  int(request.form["num"])
    res = cityIn(num)
    print "cityin"
    return json.dumps(res)

@app.route('/cityoutPos', methods=['POST'])
def cityoutPos(): 
    num =  int(request.form["num"])
    res = cityOut(num)
    print "cityout"
    return json.dumps(res)


@app.route('/citystationPos', methods=['POST'])
def citystationPos(): 
    res = cityStation()
    print "station"
    return json.dumps(res)

@app.route('/citymapPos', methods=['POST'])
def citymapPos(): 
    num =  int(request.form["num"])
    res = searchCityMap(num)
    return json.dumps(res)

@app.route('/mapPos', methods=['POST'])
def mapPos():
    
    group =  int(request.form["num"])
    res = searchMapGroup(group)
    return json.dumps(res)


# @app.route('/tablePos', methods=['POST'])
# def tablePos():
#     count =  request.form["num"]
#     print count
#     if (count == 'true'):
#         data = data0
#         print "truedata"
#     else:
#         data = data5
#         print "falsedata"
#     return json.dumps(data)

@app.route('/tablePos', methods=['POST'])
def tablePos():
    res = searchTable()
    print "table!"
    return json.dumps(res)
 

@app.route('/')
def index():
    return render_template('index.html')

if __name__ == '__main__':
    app.debug=True
    app.run(host='localhost',port = 9000)


