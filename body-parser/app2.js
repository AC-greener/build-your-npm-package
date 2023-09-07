const express = require('express');
const bodyParser = require('body-parser');

const app = express();
// curl -X POST -H "Content-Type: application/json" -d '{"age": 18}' http://localhost:3000/api/data

// 使用 bodyParser.urlencoded 中间件来处理 application/x-www-form-urlencoded 请求体数据
app.use(bodyParser.urlencoded({ extended: false }));


app.post('/api/data', (req, res) => {
  // 获取解析后的 application/x-www-form-urlencoded 数据
  const data = req.body;
  console.log(data)
  res.send({ message: '数据已接收并处理' });
});

// curl -X POST -d "name=zhangsan&age=18" http://localhost:3000/api/data

app.listen(3000, () => {
  console.log(`Server is running on port 3000`);
});