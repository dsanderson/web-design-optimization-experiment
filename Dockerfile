FROM node:10.15.3

RUN apt-get update -y
RUN apt-get install python3 python3-pip -y
RUN pip3 install flask

WORKDIR /app
COPY . ./
RUN yarn
RUN yarn build

CMD python3 launcher.py