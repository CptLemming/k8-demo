FROM python
RUN pip install redis

COPY ./runner.py /runner.py
COPY ./rediswq.py /rediswq.py

CMD tail -f /dev/null
