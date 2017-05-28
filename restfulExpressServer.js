'use strict';

const express = require('express');
const app = express();
const port = process.env.PORT || 8000;
const morgan = require('morgan');
const bodyParser = require('body-parser');
const expressServer = require('./expressServer.js');

app.disable('x-powered-by');
app.use(morgan('short'));
app.use(bodyParser.json());


app.use(expressServer);

app.use(function(req, res) {
  res.sendStatus(404);
});

app.listen(port, function() {
  console.log('Listening on port', port);
});

module.exports = app
