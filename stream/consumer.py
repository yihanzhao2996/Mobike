#!/usr/bin/env python

import socket
import pickle
from pyspark import SparkContext
from pyspark.streaming import StreamingContext
from threading import Thread
import time
import datetime

# def listener(sc,ssc):
# 	TCP_IP = '127.0.0.1'
# 	TCP_PORT = 9999
# 	BUFFER_SIZE = 40960
# 	MESSAGE = "Hello, World!"

# 	s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
# 	s.connect((TCP_IP, TCP_PORT))

# 	global rddQueue
# 	while True:
# 		data = s.recv(BUFFER_SIZE)
# 		one_slice = pickle.loads(data)
# 		# print one_slice
# 		rddQueue += [ssc.sparkContext.parallelize(one_slice,10)]
# 	s.close()
def test(rdd):
	rdd.take(1)

def main():
	sc = SparkContext(appName="PythonStreamingQueueStream")
	ssc = StreamingContext(sc, 1)
	# global rddQueue
		# rddQueue = []
		# # start listener
		# thread1 = Thread(target=listener, args=(sc,ssc))
		# thread1.start()
	# while True:
	# 	print rddQueue
		# pass

	# time.sleep(5)
	aFrame = ssc.socketTextStream("127.0.0.1", 9999)
	def f(rdd): 
		# table = rdd.split("\n");
		# print len(table)																																					
		# return [x.split(" ") for x in table]
		return rdd.split(" ")
	aFrameTable = aFrame.map(f)
	# words = lines.flatMap(lambda line: line.split(" "))
	# words.pprint()
	aFrameTable.pprint()

	bike_table = ssc.queueStream([ssc.sparkContext.parallelize((),10)])
	mappedStream0 = aFrameTable.map(lambda x: (x[1],(x[0],x[2],x[3],x[4]))).groupByKey()
	def func1(x): return list(x)[0]
	mappedStream = mappedStream0.mapValues(func1)
	# deduplicate
	# mappedStream.cogroup()
	# pair
	common_table = bike_table.join(mappedStream)
	common_table = mappedStream.join(common_table)
	update_rdd = common_table.map(lambda x : (x[0], \
		(datetime.datetime.strptime(x[1][0][0], "%Y-%m-%dT%H:%M:%S")-datetime.datetime.strptime(x[1][1][0], "%Y-%m-%dT%H:%M:%S"), \
		(float(x[1][0][2])- float(x[1][1][2]))**2 + (float(x[1][0][3]) - float(x[1][1][3]))**2))) \
		.filter(lambda x: x[0] == '0280039122#')
	update_rdd.pprint()
	bike_table = mappedStream.leftOuterJoin(bike_table)
	bike_table.pprint()

	# lines.foreachRDD(test)
		# inputStream = ssc.queueStream(rddQueue)
		# bike_table = ssc.queueStream([ssc.sparkContext.parallelize((),10)])
		# mappedStream0 = inputStream.map(lambda x: (x[1],(x[0],x[2],x[3],x[4]))).groupByKey()
		# def f(x): return list(x)[0]
		# mappedStream = mappedStream0.mapValues(f)
		# # deduplicate
		# # mappedStream.cogroup()
		# # pair
		# # common_table = bike_table.join(mappedStream)
		# common_table = mappedStream.join(mappedStream)
		# update_rdd = common_table.map(lambda x : (x[0], \
		# 	(datetime.datetime.strptime(x[1][0][0], "%Y-%m-%dT%H:%M:%S")-datetime.datetime.strptime(x[1][1][0], "%Y-%m-%dT%H:%M:%S"), \
		# 	(float(x[1][0][2])- float(x[1][1][2]))**2 + (float(x[1][0][3]) - float(x[1][1][3]))**2))) \
		# 	.filter(lambda x: x[0] == '0280039122#')
		# update_rdd.pprint()
		# mappedStream.pprint()
		# bike_table = mappedStream.leftOuterJoin(bike_table)
		# bike_table.pprint()
		# # new_bike_table = mappedStream.transform(lambda rdd: rdd.leftOuterJoin(bike_table))
		# # new_bike_table.pprint()
		# # nn = new_bike_table.leftOuterJoin(mappedStream)
		# # nn.pprint()
	ssc.start()
	ssc.awaitTermination()
	# thread1.join()

if __name__ == '__main__':
	main()