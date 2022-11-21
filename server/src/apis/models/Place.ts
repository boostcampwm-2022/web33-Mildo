import mongoose, { Schema } from 'mongoose';

interface PlaceSchemaTypes {
  areaName: string;
  latitude: number;
  longitude: number;
}

const placeSchema = new Schema<PlaceSchemaTypes>({
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

const Place = mongoose.model('place', placeSchema);
export default Place;
