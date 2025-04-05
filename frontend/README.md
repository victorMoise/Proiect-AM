# Project description

Full-stack web app created using React and Java, with database in mongo

Designed to be a template for all future projects, maybe even a starting point, with already implemented login and register functionality, and very basic admin page

# **Setup**

- React
  1. Install _[node-js](https://nodejs.org/en/download)_
  2. In terminal, run **_npm install_** to download the _node-modules_ folder
  3. To start the app, in the terminal, run **\*npm start** \*
- Java
  1. Project was created with _[jdk-23](https://www.oracle.com/java/technologies/downloads/)_
  2. Start the app
- MongoDb
  1. Inside the backend source folder (java), there's a file _docker-compose.yaml._ This will create the docker container containing the database
  2. Install [docker-desktop](https://www.docker.com/products/docker-desktop/)
  3. In the same folder with the file specified above, run the command **_docker compose -f docker-compose.yaml_**
  4. The container should appear inside docker desktop, along side it's images. From here you can stop / start the container anytime you want

# Future goals

1. Proper security system with spring security
2. Template frontend will be rewritten in typescript
3. Improve design, right now the app is simple, yet completly responsive. A better design wouldn't be so bad
4. Create a generic utility function to send requests to the server (axios)
