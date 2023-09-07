const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// 使用 bodyParser.json 中间件来处理 JSON 请求体数据
app.use(bodyParser.json());

// curl -X POST -H "Content-Type: application/json" -d '{"age": 18}' http://localhost:3000/api/data

app.post('/api/data', (req, res) => {
  // 获取解析后的 JSON 数据
  const jsonData = req.body;
  console.log(jsonData)
  res.send({ message: 'JSON 数据已接收并处理' });
});


app.listen(3000, () => {
  console.log(`Server is running on port 3000`);
});