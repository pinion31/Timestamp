var express = require('express');
const bodyparser = require('body-parser');

const app = express();
app.use(express.static('static'));
app.use(bodyparser.json());

app.get('/', (req,res) => {
  res.json(req.body);
}).listen(3000, () => {
  console.log('App started on port 3000');
});