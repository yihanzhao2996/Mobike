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
    data = list(csv.reader(open(csv_name, 'rb'), delimiter=','))
    for row in data:
        del row[3:6]  # keep 5 columns: timeStamp, bikeID(end with '#'), bikeType, longitude, latitude
    gatherByTime(data)


def gatherByTime(input_data):
    basetime = input_data[0][0]
    # print basetime
    start = 0
    end = 0
    # sc = SparkContext(appName="PythonStreamingQueueStream")
    # ssc = StreamingContext(sc, 1)
    # rddQueue = []
    # zkQuorum, topic = sys.argv[1:]
    for row in input_data:
        if row[0] == basetime:
            end += 1
        else:  # when detect the change in timeStamp, dump the file as pickle and send it
            # pickle.dump(input_data[start:end+1], open('%s.pkl' % basetime, 'wb'))
            conn.send(pickle.dumps(input_data[start:end+1]))
            # rddQueue += [ssc.sparkContext.parallelize(input_data[start:end+1],10)]
            # start = end + 1
            # end += 1
            # basetime = row[0]
            time.sleep(1)
            if end == len(input_data):
                # rddQueue += [ssc.sparkContext.parallelize(input_data[-1],10)]
                conn.send(pickle.dumps(input_data[-1]))
                # pickle.dump(input_data[-1], open(basetime, 'wb'))
    conn.close()
    # inputStream = ssc.queueStream(rddQueue)
    # kafka_stream = KafkaUtils.createStream(ssc, \
    #     zkQuorum, \
    #     "spark-streaming-consumer", \
    #     {topic: 1})

    # ssc.start()
    # ssc.awaitTermination()



if __name__ == '__main__':
    # if len(sys.argv) != 3:
    #     print("Usage: Unzip.py <zk> <topic>")
    #     exit(-1)
    data = unzip('20170412-200908.csv.gz')