FROM python
RUN pip install redis
COPY ./seeder.py /seeder.py
COPY ./rediswq.py /rediswq.py

CMD python seeder.py
