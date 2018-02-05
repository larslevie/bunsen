FROM python:3.6.4-alpine3.7
MAINTAINER Lars Levie <larslevie@gmail.com>

run apk --update add \
    build-base \
    postgresql-dev \
    py3-psycopg2 \
    make

ENV PYTHONUNBUFFERED 1

RUN mkdir /code
WORKDIR /code

COPY requirements.txt /code/
COPY scripts/install-deps /code/scripts/
RUN scripts/install-deps

COPY . /code/

CMD ["python3", "manage.py", "runserver", "0:8000"]
