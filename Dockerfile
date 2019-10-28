FROM node:10.15.3

RUN apt-get update -y
RUN apt-get install python3 python3-pip -y
RUN pip3 install flask

COPY package.json ./
COPY yarn.lock ./
RUN yarn

RUN pip3 install gpkit
RUN pip3 install matplotlib

COPY . ./
RUN yarn build

#RUN python3 SimPleAC.py
#CMD python3 launcher.py
#CMD python3 SimPleAC.py
RUN python3 desal.py
CMD python3 launcher.py