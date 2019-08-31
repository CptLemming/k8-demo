#!/usr/bin/env python

import time
import rediswq

seeds = ["apple", "banana", "orange"]

q = rediswq.RedisWQ(name="job2", host="redis")
print("Seeder with sessionID: " +  q.sessionID())

for seed in seeds:
    print("Seeding: " + seed)
    q.create(seed)

print("Seeder complete, exiting")
