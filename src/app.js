const express = require('express');
const cors = require('cors');
require('dotenv').config();

const routes = require('./routes');
const { notFound, error } = require('./api/middlewares/error');

const app = express();

app.use(
  cors({
    origin: '*',
    methods: '*',
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);
app.use(notFound);
app.use(error);

module.exports = app;
