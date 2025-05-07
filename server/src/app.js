require('dotenv').config();
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');

const authRouter = require('./routers/auth.router');
const profileRouter = require('./routers/profile.router');
const questRouter = require('./routers/quest.router');
const tokenRouter = require('./routers/token.router');
const commentsRouter = require('./routers/comments.router');

const PORT = process.env.PORT;

const corsConfig = {
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
  credentials: true,
};
app.use(cors(corsConfig));

app.use(cookieParser());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/profile', profileRouter);
app.use('/api/quests', questRouter);
app.use('/api/token', tokenRouter);
app.use('/api/comments', commentsRouter);

app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
app.use(
  '/uploads/quests',
  express.static(path.join(__dirname, '../uploads/quests'))
);

app.listen(PORT, () => {
  console.log(`Server started at ${PORT} port`);
});
