const express = require('express')

const bodyParser = require('body-parser');
const cors = require('cors');
const app = express()
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  logger.info({ endpoint: req.url }, 'Hello World!');
  res.send('Hello World!')
})

const router = require('./routes');
const logger = require('./utils/logger');
app.use('/api', router);

const port = 3000;
app.listen(port, () => {
  logger.info(`Server started on port ${port}`);
})