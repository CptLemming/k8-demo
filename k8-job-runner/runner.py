#!/usr/bin/env python

import time
import rediswq

q = rediswq.RedisWQ(name="job2", host="redis")
print("Runner with sessionID: " +  q.sessionID())
print("Initial queue state: empty=" + str(q.empty()))
while not q.empty():
  time.sleep(5) # Polling interval
  print("Queue is running")
print("Runner complete, exiting")
