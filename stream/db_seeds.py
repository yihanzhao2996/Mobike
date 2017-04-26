#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import os
import csv
import sys
import pickle
import socket
import time
import MySQLdb

db = MySQLdb.connect("localhost","root","","mobike" )
cursor = db.cursor()
# db.select_db('mobike')

cursor.execute('use mobike')

def unzip(file_name):
    os.system("gunzip -k " + file_name)  # unzip type: -k keep the origin .gz file
    csv_name = file_name[:-3]
    data = list(csv.reader(open(csv_name, 'rb'), delimiter=','))
    for row in data:
        del row[3:6]  # keep 5 columns: timeStamp, bikeID(end with '#'), bikeType, longitude, latitude
    gatherByTime(data)



def gatherByTime(input_data):
    basetime = input_data[0][0]
    start = 0
    end = 0
    r_id = 0
    for row in input_data:
        if row[0] == basetime:
            end += 1
        else:  # when detect the change in timeStamp, dump the file as pickle and send it
            # pickle.dump(input_data[start:end+1], open('%s.pkl' % basetime, 'wb'))
            Message = ''
            print start
            for line in input_data[start:end+1]:
                # Message += ' '.join(line)+'\n'

                cursor.execute('insert into heatmap (bike_id,result_id, park_time,la,lo) VALUES ("%s", "%s" , "%s","%s","%s")' % \
                 (line[1],r_id,line[0],line[-1],line[-2]))
                
                # conn.send(pickle.dumps(input_data[start:end+1]))

            # rddQueue += [ssc.sparkContext.parallelize(input_data[start:end+1],10)]
            start = end + 1
            end += 1
            basetime = row[0]
            r_id += 1
            db.commit()


            time.sleep(1)
    
    cursor.close()
if __name__ == '__main__':
    data = unzip('20170412-200908.csv.gz')