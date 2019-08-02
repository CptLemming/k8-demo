FROM python:3.6.6-alpine

WORKDIR /app

COPY requirements.txt .

RUN pip3 install -r requirements.txt

COPY src src

EXPOSE 5000

ENTRYPOINT ["python3"]

CMD ["src/app.py"]
