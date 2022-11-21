import mongoose, { Schema } from 'mongoose';

interface AreaSchemaTypes {
  areaName: string;
  latitude: number;
  longitude: number;
}

const areaSchema = new Schema<AreaSchemaTypes>({
  areaName: {
    type: String,
    maxlength: 20,
    required: true,
    unique: true
  },
  latitude: {
    type: Number,
    required: true
  },
  longitude: {
    type: Number,
    required: true
  }
});

const Area = mongoose.model('area', areaSchema);
export default Area;
