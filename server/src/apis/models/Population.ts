import mongoose, { Schema } from 'mongoose';

interface PopulationSchemaTypes {
  areaName: string;
  populationMax: number;
  populationMin: number;
  populationLevel: string;
  populateionTime: Date;
  created: Date;
}

const populationSchema = new Schema<PopulationSchemaTypes>({
  areaName: {
    type: String,
    maxlength: 20,
    required: true,
    unique: true
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
  populateionTime: {
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
