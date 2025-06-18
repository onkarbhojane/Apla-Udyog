import { getMarketRates } from '../controllers/getMarketRates.js'; 
import express from 'express';
const MarketRate = express.Router();
MarketRate.get('/', getMarketRates);
export default MarketRate;