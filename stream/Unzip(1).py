#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import os
import csv
import sys
import pickle
import socket
import time
# from pyspark.streaming.kafka import KafkaUtils

# from pyspark import SparkContext
# from pyspark.streaming import StreamingContext

TCP_IP = '127.0.0.1'
TCP_PORT = 9999
BUFFER_SIZE = 40960

s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.bind((TCP_IP, TCP_PORT))
s.listen(1)

conn, addr = s.accept()
print 'Connection address:', addr


def unzip(file_name):
    os.system("gunzip -k " + file_name)  # unzip type: -k keep the origin .gz file
    csv_name = file_name[:-3]
    data = list(csv.reader(open(csv_name, 'r'), delimiter=','))
    for row in data:
        del row[3:6]  # keep 5 columns: timeStamp, bikeID(end with '#'), bikeType, longitude, latitude
    gatherByTime(data)


def gatherByTime(input_data):
    basetime = input_data[0][0]
    start = 0
    end = 0
    for row in input_data:
        if row[0] == basetime:
            end += 1
        else:
            conn.send(pickle.dumps(input_data[start:end+1]))
            time.sleep(1)
            if end == len(input_data):
                conn.send(pickle.dumps(input_data[-1]))
    conn.close()


if __name__ == '__main__':
    data = unzip('20170412-200908.csv.gz')