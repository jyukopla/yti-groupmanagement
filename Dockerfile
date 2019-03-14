FROM gradle:3.5-jdk8 as builder

RUN git clone https://github.com/VRK-YTI/yti-groupmanagement.git && git clone https://github.com/VRK-YTI/yti-spring-security.git
WORKDIR /home/gradle/yti-spring-security
RUN git checkout tags/v0.1.2 && gradle publishToMavenLocal
WORKDIR /home/gradle/yti-groupmanagement
ADD build.gradle .
RUN gradle assemble

FROM openjdk:8-jdk-alpine
RUN apk add --update git
COPY --from=builder /home/gradle/yti-groupmanagement/web-api/build/libs/yti-groupmanagement.jar yti-groupmanagement.jar
ADD application-local.properties /
ENV JAVA_OPTS="-Dspring.profiles.active=local"
ENTRYPOINT [ "sh", "-c", "sleep 5 && java $JAVA_OPTS -Djava.security.egd=file:/dev/./urandom -jar /yti-groupmanagement.jar" ]
