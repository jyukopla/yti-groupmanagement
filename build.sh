#!/bin/bash

./gradlew assemble
docker build -t yti-groupmanagement .
