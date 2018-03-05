FROM node:9.7.1-alpine
MAINTAINER Lars Levie <larslevie@gmail.com>

run apk --update add \
    build-base \
    postgresql-dev \
    py3-psycopg2 \
    make \
    python \
    python3 \
    nodejs \
    py3-pip

ENV PYTHONUNBUFFERED 1

RUN mkdir /code
WORKDIR /code

COPY requirements.txt /code/
COPY bin/install-deps /code/bin/
RUN bin/install-deps

COPY package*.json /code/
RUN npm install

COPY .eslintrc /code/
COPY .stylelintrc.json /code/
COPY bin/build bin/
COPY etc/cogs.js etc/
COPY assets/src assets/src/

RUN MINIFY='1' bin/build

COPY . /code/

CMD ["python3", "manage.py", "runserver", "0:8000"]
