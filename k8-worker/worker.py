#!/usr/bin/env python

import time
import rediswq

host="redis"
# Uncomment next two lines if you do not have Kube-DNS working.
# import os
# host = os.getenv("REDIS_SERVICE_HOST")

print("Worker startup", flush=True)
q = rediswq.RedisWQ(name="job2", host="redis")
print("Worker with sessionID: " +  q.sessionID(), flush=True)
print("Initial queue state: empty=" + str(q.empty()), flush=True)
while True:
  item = q.lease(lease_secs=10, block=True, timeout=2) 
  if item is not None:
    itemstr = item.decode("utf=8")
    print("Working on " + itemstr, flush=True)
    time.sleep(10) # Put your actual work here instead of sleep.
    q.complete(item)
  else:
    time.sleep(10) # Polling interval
    print("Waiting for work", flush=True)
