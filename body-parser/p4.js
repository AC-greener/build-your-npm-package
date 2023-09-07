const http = require("http");
const handleRawStream = require("./handleRawStream");
const querystring = require("querystring");
const path = require("path");
const fs = require("fs");

// 创建一个 HTTP 服务器
const server = http.createServer((req, res) => {
  const contentType = req.headers["content-type"]
  if (contentType === "application/json") {
    handleRawStream(req, (buffer) => {
      const data = buffer.toString('utf-8')
      req.body = JSON.parse(data)
      console.log('req.body :', req.body);
      
      res.end("parse json")
    })
  } else if (contentType === "application/x-www-form-urlencoded") {
    handleRawStream(req, (buffer) => {
      const data = buffer.toString('utf-8')
      req.body = querystring.parse(data)
      console.log('req.body :', req.body)
      res.end("parse json")
    })
  } else {
    res.end("hello world")
  }
})

// 监听端口 3000
const port = 3000;
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}/`);
});
