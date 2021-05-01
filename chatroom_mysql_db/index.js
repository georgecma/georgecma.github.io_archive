
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
var cors = require('cors');

app.use(cors());

const port = process.env.PORT || 4000;
const queryMessagesRouter = require('./routes/queryMessages');

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get('/', (req, res) => {
  res.json({'message': 'ok'});
})

app.use('/query_messages', queryMessagesRouter);

/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({'message': err.message});
  return;
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});

app.post("/message_hook", (req, res) => {
    console.log(req.body) // Call your action on the request here
    res.status(200).end() // Responding is important
  })
  