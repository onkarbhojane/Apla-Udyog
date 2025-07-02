import express from 'express';
import bodyParser from 'body-parser';
import MarketRate from './routes/MarketRates.js';
import env from 'dotenv';
import mongoose from 'mongoose';
env.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/MarketRates',MarketRate);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  })
  .catch((err) => console.log(err));