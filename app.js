require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const routes = require('./routes');
const cors = require('cors');

const app = express();

app.use(
  cors({
    origin: [
      'http://localhost:3000',
      'https://easy-stay-react.vercel.app',
      'https://easy-stay-backend-s7ne.onrender.com',
    ],
    credentials: true,
  })
);

mongoose.connect(process.env.DB_CONNECTION_STRING).then(() => {
  console.log(`Connected to MongoDB`);
});

app.use(cookieParser());
app.use(express.json());

app.use('/api', routes);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT || 3000}`);
});
