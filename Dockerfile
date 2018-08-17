FROM openjdk:8-jdk-alpine

RUN apk add --update git

ADD web-api/build/libs/yti-groupmanagement.jar yti-groupmanagement.jar

ENV JAVA_OPTS=""
ENTRYPOINT [ "sh", "-c", "sleep 5 && java $JAVA_OPTS -Djava.security.egd=file:/dev/./urandom -jar /yti-groupmanagement.jar" ]
