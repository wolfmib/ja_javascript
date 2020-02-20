#!/bin/bash
vi package.json
npm i grpc-web
sudo npm install -g npm
protoc --version
git clone https://github.com/grpc/grpc-web.git
cd grpc-web
sudo make install-plugin
cd ..
echo generated grpc-web.js
protoc -I=. proto/gameslot.proto --grpc-web_out=import_style=commonjs,mode=grpcwebtext:compiled_js_proto
echo generated proto.js
protoc proto/gameslot.proto --js_out=import_style=commonjs:compiled_js_proto
cd grpc-web
echo Remember this link before go to docker
echo http://localhost:8081/echotest.html
echo ...
read whaterever_var
docker-compose up node-server envoy commonjs-client
npm install webpack-cli
vi client.js
npm install google-protobuf@3.6.1
npm install webpack@4.16.5
npm install browserify@16.2.2
npx webpack client.js
cd dist
cat main.js
