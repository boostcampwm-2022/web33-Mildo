import mongoose, { Schema } from 'mongoose';
import { PopulationSchemaTypes } from '../types/interfaces';

const populationSchema = new Schema<PopulationSchemaTypes>({
  areaName: {
    type: String,
    maxlength: 20,
    required: true
  },
  populationMax: {
    type: Number,
    required: true
  },
  populationMin: {
    type: Number,
    required: true
  },
  populationLevel: {
    type: String,
    required: true
  },
  populationTime: {
    type: Date,
    required: true
  },
  created: {
    type: Date,
    default: Date.now
  }
});

const Population = mongoose.model('population', populationSchema);
export default Population;
