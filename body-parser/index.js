const http = require("http");
const handleRawStream = require("./handleRawStream");
const querystring = require("querystring");
const path = require("path");
const fs = require("fs");
// 创建一个 HTTP 服务器
const server = http.createServer((req, res) => {
  console.log("req :>> ", req.headers["content-type"]);
  const contentType = req.headers["content-type"];
  if (contentType === "application/json") {
    // curl -X POST -H "Content-Type: application/json" -d '{"key": "value"}' http://localhost:3000
    handleRawStream(req, (buffer) => {
      const data = JSON.parse(buffer);
      req.body = data;
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(data));
    });
  } else if (contentType === "application/x-www-form-urlencoded") {
    // curl -X POST -d "key1=value1&key2=value2" http://localhost:3000
    handleRawStream(req, (buffer) => {
      res.writeHead(200, { "Content-Type": "application/json" });
      let x = querystring.parse(buffer.toString('utf-8'));//将buffer转换成字符串，
      console.log("querystring.parse(buf :>> ", x);
      res.end("hello");
    });
  } else if (contentType.startsWith('multipart/form-data')) {
    // curl  -X POST \
    //       -F "name=zhangsan" \
    //       -F "age=18" \
    //       -F "raw=@a.json" \
    //       http://localhost:3000
    let body = [];
    // let body = Buffer.alloc(0);

    req.on("data", (chunk) => {
      // body = Buffer.concat([body, chunk]);
      body.push(chunk);
    });

    req.on("end", () => {
      // 解析 multipart/form-data 请求体
      const boundary = `--${req.headers["content-type"]
        .split("; ")[1]
        .replace("boundary=", "")}`;
        // 解析请求体，分割成多个部分（parts），每个部分代表一个字段或文件。这里采用的分隔符是请求头中的 boundary 值。
        const parts = body.toString().split(boundary);
        // 循环处理每个部分
        for (const part of parts) {
          if (part.includes('filename=')) {
            // 如果 part 包含 'filename='，则为文件
            const [, filename] = /filename="(.*)"/.exec(part.split('\r\n')[1]);
            const fileData = part.split('\r\n\r\n')[1];
  
            // 保存文件到服务器
            const filePath = path.join(__dirname, 'uploads', filename);
            fs.writeFile(filePath, fileData, (err) => {
              if (err) {
                console.error('Error saving file:', err);
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal Server Error');
              } else {
                console.log(`File saved: ${filename}`);
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end('File uploaded successfully');
              }
            });
          } else if (part.includes('name=')) {
            // 如果 part 包含 'name='，则为表单字段
            const [, fieldName] = /name="(.*)"/.exec(part.split('\r\n')[1]);
            const fieldData = part.split('\r\n\r\n')[1];
            console.log(`Form field received: ${fieldName} = ${fieldData}`);
          }
        }

    });
  }
  // 设置响应头
  // 向客户端发送响应
});

// 监听端口 3000
const port = 3000;
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}/`);
});
