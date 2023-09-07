const http = require("http")

// 创建一个 HTTP 服务器
const server = http.createServer((req, res) => {
  const contentType = req.headers["content-type"]
  console.log("contentType :>> ", contentType)
  res.end("hello world")
})

const port = 3000
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}/`)
})