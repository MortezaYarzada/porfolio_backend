const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

const projectsRouter = require('./routes/projects');
const profileRouter = require('./routes/profile');
const messagesRouter = require('./routes/messages');
const authRouter = require('./routes/auth');
const authMiddleware = require('./middleware/auth');

app.use('/api/projects', projectsRouter);
app.use('/api/profile', profileRouter);
app.use('/api/messages', messagesRouter);
app.use('/api/user', authRouter);

// Protected routes
app.use('/api/admin/projects', authMiddleware, projectsRouter);
app.use('/api/admin/profile', authMiddleware, profileRouter);
app.use('/api/admin/messages', authMiddleware, messagesRouter);


app.get('/', (req, res) => {
  res.send('Portfolio backend is running!');
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
