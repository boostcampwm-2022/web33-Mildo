import { PopulationSchemaTypes } from './../types/interfaces';
import Population from '../models/Population';

export default {
  saveMany: (cityData: PopulationSchemaTypes[]) => {
    Population.insertMany(cityData)
      .then(() => {
        console.log('data inserted');
      })
      .catch(e => {
        console.log(e);
      });
  }
};
