from os import walk
import re
import heapq
import datetime

db_path = 'db/'
f = []
pq = []
base_time = datetime.datetime(2017,4,5,0,0,0)
print base_time
for (dirpath, dirnames, filenames) in walk(db_path):
	for filename in filenames:
		print filename
		mt_obj = re.search(r'.*.gz\b', filename)
		if mt_obj:
			time_str = filename.split('.')[0]
			time_time = datetime.datetime.strptime(time_str, "%Y%m%d-%H%M%S")
			heapq.heappush(pq,((time_time-base_time).total_seconds(), filename))
			f.extend([filename])
print f
print len(f)
print pq