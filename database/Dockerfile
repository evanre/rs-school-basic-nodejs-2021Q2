FROM postgres:alpine
RUN apk upgrade libxml2 && apk --update add postgresql-client

EXPOSE ${POSTGRES_PORT}
