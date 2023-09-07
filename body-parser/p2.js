const http = require("http");
const handleRawStream = require("./handleRawStream");
const querystring = require("querystring");
const path = require("path");
const fs = require("fs");

// 创建一个 HTTP 服务器
const server = http.createServer((req, res) => {
  const contentType = req.headers["content-type"]
  if (contentType === "application/json") {
    let buffers = []
    req.on('data', function (chunk) { // 1.监听data事件
      buffers.push(chunk)
    })

    req.on('end', function () { // 2.监听end事件
      buffers = Buffer.concat(buffers) // 3.拼接buffer
      buffers = buffers.toString('utf-8') // 4.转换成字符串
      console.log('buffers :', buffers)
      
      req.body =  JSON.parse(buffers); // 5.转换成对象
      console.log('req.body :', req.body)
      res.end("parse json")
    });

  } else {
    res.end("hello world")
  }
})

// 监听端口 3000
const port = 3000;
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}/`);
});
