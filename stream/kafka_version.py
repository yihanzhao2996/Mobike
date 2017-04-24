import os
import csv
import pickle
import socket
import time
import sys
# from pyspark import SQLContext
# from pyspark.sql import Row
# from operator import add
# from pyspark.streaming import StreamingContext
# from pyspark.streaming.kafka import KafkaUtils
import json
# from pyspark import SparkConf, SparkContext
import time
from kafka import KafkaProducer
# from pyspark.streaming.kafka import KafkaUtils

# from pyspark import SparkContext
# from pyspark.streaming import StreamingContext
# sc = SparkContext()
# sql = SQLContext(sc)

def unzip(file_name):
    os.system("gunzip -k " + file_name)  # unzip type: -k keep the origin .gz file
    csv_name = file_name[:-3]
    data = list(csv.reader(open(csv_name, 'rb'), delimiter=','))
    for row in data:
        del row[3:6]  # keep 5 columns: timeStamp, bikeID(end with '#'), bikeType, longitude, latitude
    print data[0]
    gatherByTime(data)


def gatherByTime(input_data):
   
    basetime = input_data[0][0]
    # print basetime
    start = 0
    end = 0
    # kafka = KafkaClient("localhost:9092")
    producer = KafkaProducer(bootstrap_servers='localhost:9092')
    # sc = SparkContext(appName="PythonStreamingQueueStream")
    # ssc = StreamingContext(sc, 1)
    # rddQueue = []
    # zkQuorum, topic = sys.argv[1:]
    for row in input_data:
        if row[0] == basetime:
            end += 1
        else:  # when detect the change in timeStamp, dump the file as pickle and send it
            # pickle.dump(input_data[start:end+1], open('%s.pkl' % basetime, 'wb'))
            for row in input_data[start:end+1]:
                producer.send("my-topic", b'helle')
            # f1 = sc.parallelize(f)
            # f = sc.textFile("/Users/yihan/Downloads/20170412-200908.csv")
            # print f.take(10)
            # f1= f.map(lambda x:x.split(','))
            # f2 = sql.createDataFrame(f1)
            # print f2.take(10)

            
            time.sleep(1)
            if end == len(input_data):
                
                 producer.send_messages("my-topic", b'end')
               



if __name__ == '__main__':
    # if len(sys.argv) != 3:
    #     print("Usage: Unzip.py <zk> <topic>")
    #     exit(-1)
    data = unzip('/Users/yihan/Downloads/20170412-200908.csv.gz')