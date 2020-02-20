## I am lazy..
---

just take a look at the tutorial link:
---

https://github.com/grpc/grpc-web/tree/master/net/grpc/gateway/examples/helloworld



- for mac
    - in envoy.yaml:
    - change the last line
    - hosts: [{ socket_address: { address: host.docker.internal, port_value: 9090 }}]

- for mac: 
    - change: docker run -d -p 8080:8080 -p 9901:9901 --network=host helloworld/envoy
    - to thies:  docker run -d -p 8080:8080 -p 9901:9901 helloworld/envoy

- for npx compiled:
    - change:  npx webpack client.js
    - to this: npx webpack --mode development client.js

- both python2 or python3 to run the static index.html and ./dist/main.js is fine
    - python2 -m SimpleHTTPServer 8081 &
    - python3 -m http.server 8081 &

