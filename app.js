import express from 'express';
import dotenv from 'dotenv';

const app = express();
const router = express.Router();
// Define routes and middleware here
dotenv.config();

app.get('/', (req, res, next) => {
  res.send('<h1>Hi!</h1>');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
