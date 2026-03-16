const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 4000;

const tasksRouter = require('./routes/Tasks');

app.use(cors());
app.use(express.json());

app.use('/tasks', tasksRouter);

app.get('/', (req, res) => {
  res.send('Hello from Express!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});