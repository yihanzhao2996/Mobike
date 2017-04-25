#!/usr/bin/env python

import socket
import pickle
from pyspark import SparkContext
from pyspark.streaming import StreamingContext
from threading import Thread
import time
import datetime
from geopy.distance import great_circle


def listener(sc, ssc):
	TCP_IP = '127.0.0.1'
	TCP_PORT = 9999
	BUFFER_SIZE = 40960
	MESSAGE = "Hello, World!"

	s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
	s.connect((TCP_IP, TCP_PORT))

	global rddQueue
	while True:
		data = s.recv(BUFFER_SIZE)
		one_slice = pickle.loads(data)
		# print one_slice
		rddQueue += [ssc.sparkContext.parallelize(one_slice,10)]
	s.close()

def main():
	sc = SparkContext(appName="PythonStreamingQueueStream")
	ssc = StreamingContext(sc, 1)
	global rddQueue
	rddQueue = []
	# start listener
	thread1 = Thread(target=listener, args=(sc,ssc))
	thread1.start()

	time.sleep(5)
	inputStream = ssc.queueStream(rddQueue)
	bike_table = ssc.queueStream([ssc.sparkContext.parallelize((),10)])
	inputStream.pprint()
	mappedStream0 = inputStream.map(lambda x: (x[1],(x[0],x[2],x[3],x[4]))).groupByKey()
	def f(x): return list(x)[0]
	mappedStream = mappedStream0.mapValues(f)
	# mappedStream.pprint()
	# mappedStream using BikeID as key, including time, type, longitude, latitude
	# the new received data stored in mappedStream

	common_table = mappedStream.join(mappedStream)
	# select only the pieces of data having the same BikeId
	update_rdd = common_table.map(lambda x : (x[0], x[1][0][0], x[1][1][0],
											  (datetime.datetime.strptime(x[1][0][0], "%Y-%m-%dT%H:%M:%S")-
											  datetime.datetime.strptime(x[1][1][0], "%Y-%m-%dT%H:%M:%S")).total_seconds(),
											  (float(x[1][0][2]), float(x[1][0][3])),
											  (float(x[1][1][2]), float(x[1][1][3])),
											  great_circle((float(x[1][0][2]), float(x[1][0][3])), (float(x[1][1][2]), float(x[1][1][3]))).miles))\
		.filter(lambda x: x[3] != .0)
	# updated_bike = update_rdd.sortByKey()
	# update_rdd.pprint()
	# mappedStream.pprint()
	bike_table = mappedStream.leftOuterJoin(bike_table)
	# bike_table.pprint()

	ssc.start()
	ssc.awaitTermination()


if __name__ == '__main__':
	main()