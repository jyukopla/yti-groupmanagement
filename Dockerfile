FROM openjdk:8-jdk-alpine

RUN apk add --update git

ADD web-api/build/libs/yti-groupmanagement.jar yti-groupmanagement.jar

ADD *.properties ./

ENV JAVA_OPTS=""
ENTRYPOINT [ "sh", "-c", "java $JAVA_OPTS -Djava.security.egd=file:/dev/./urandom -jar /yti-groupmanagement.jar" ]