import mongoose from 'mongoose';

const bazarSamitiSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  date:{
    type: Date,
    default: Date.now,
  },
  items: [
    {
      name: {
        type: String,
        required: true,
      },
      unit: {
        type: String,
        required: true,
      },
      maxPrice: {
        type: String
      },
      minPrice: {
        type: String,
      },
      totalImports: {
        type: Number,
        required: true,
      },
      image:{
        type: String
      }
    },
  ],
});
const BazarSamiti = mongoose.model('BazarSamiti', bazarSamitiSchema);
export default BazarSamiti;