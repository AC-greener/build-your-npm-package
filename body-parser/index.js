const http = require("http");
const handleRawStream = require("./handleRawStream");
const querystring = require("querystring");
const path = require("path");
const fs = require("fs");
// 创建一个 HTTP 服务器
const server = http.createServer((req, res) => {
  console.log("content-type:", req.headers["content-type"]);
  const contentType = req.headers["content-type"];
  if (contentType === "application/json") {
    // curl -X POST -H "Content-Type: application/json" -d '{"key": "value"}' http://localhost:3000
    handleRawStream(req, (buffer) => {
      const data = JSON.parse(buffer.toString("utf-8"));
      console.log('data :', data);

      req.body = data;
      res.end("parse json");
    });
  } else if (contentType === "application/x-www-form-urlencoded") {
    // curl -X POST -d "key1=value1&key2=value2" http://localhost:3000
    handleRawStream(req, (buffer) => {
      const data = querystring.parse(buffer.toString('utf-8'));
      console.log('data :', data);
      req.body = data;
      res.end("parse urlencoded");
    });
  } else {
    res.end("hello world");
  }
});

// 监听端口 3000
const port = 3000;
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}/`);
});
