/* eslint-disable import/no-extraneous-dependencies */
import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import accountsRoutes from './src/routes/accounts';
import addressesRoutes from './src/routes/addresses';

const app = express();
// Define routes and middleware here
app.use(bodyParser.json());
dotenv.config();

// app.use('/accounts/:accountId/addresses/:addressId', addressesRoutes);
app.use('/accounts/:accountId/addresses', addressesRoutes);
app.use('/accounts', accountsRoutes);

app.get('/', (req, res) => {
  res.json({ health: true });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
