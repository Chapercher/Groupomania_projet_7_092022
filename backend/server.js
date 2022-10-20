const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user.routes');
const postRoutes = require('./routes/post.routes');
require('dotenv').config({ path: './config/.env' });
require('./config/db');
const { checkUser, requireAuth } = require('./middleware/auth.middleware');
const { trusted } = require('mongoose');

const app = express();

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', `${process.env.CLIENT_URL}`);
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-Requested-With,content-type'
  );
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('preflightContinue', true)
  next();
});

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// jwt
app.get('*', checkUser);
app.get('/jwtid', requireAuth, (req, res) => {
  res.status(200).send(res.locals.user._id);
});

// routes
app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);

// server
app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
