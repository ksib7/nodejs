import http from "http";
import path from "path";
import fs from "fs";
import { Server } from "socket.io";

const server = http.createServer((request, response) => {
  if (request.method === "GET") {
    const filePath = path.join(path.resolve("../index.html"));
    const readStream = fs.createReadStream(filePath);
    readStream.pipe(response);
  } else if (request.method === "POST") {
    let data = "";
    request.on("data", (chunk) => {
      data += chunk;
    });
    request.on("end", () => {
      const parsedData = JSON.parse(data);
      console.log(parsedData);
      response.writeHead(200, { "Content-Type": "json" });
      response.end(data);
    });
  } else {
    response.statusCode = 405;
    response.end();
  }
});

const socket = new Server(server);
socket.on("connection", function (client) {
  console.log("Connect");

  userCount[client.id] = {
    id: client.id,
  };

  client.on("CLIENT_MSG_NAME", (data) => {
    client.broadcast.emit("NEW_CONNECT", {
      msg: "The new client connected: ",
      name: data.nikName,
    });
    userName = [...userName, { id: client.id, nikName: data.nikName }];
  });

  client.on("CLIENT_MSG", (data) => {
    userName.forEach((nikName) => {
      if (nikName.id == client.id) {
        client.broadcast.emit("SERVER_MSG", {
          msg: data.msg,
          clName: nikName.nikName,
        });
        client.emit("SERVER_MSG", { msg: data.msg, clName: nikName.nikName });
      }
    });
  });

  client.on("disconnect", () => {
    console.log("Diconnect");
    delete userCount[client.id];

    const delUser = userName.findIndex((ind) => ind.id == client.id);
    userName.splice(delUser);

    userName.forEach((nikName) => {
      client.broadcast.emit("SERVER_MSG", {
        msg: "отключился от чата",
        clName: nikName.nikName,
      });
    });
  });
});
server.listen(3000, "localhost", () => {
  console.log("Server has been started!");
});
