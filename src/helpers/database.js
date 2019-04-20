import Sequelize from 'sequelize';
import { DB_CONFIG } from '../../config';
import * as models from '../models';

export class Database {
  constructor() {
    Database.instance.authenticate()
    .then(() => {
      Object.values(models).map(model => {
        return model.init(Database.instance);
      }).filter(model => {
        return (typeof model.associate).includes('function');
      }).forEach(model => {
        model.associate(Database.instance.models);
      });
      Database.instance.sync().then(() => {
        console.log('Initialize database has been established successfully.');
      });
    })
    .catch((error) => {
      console.error('Unable to initialize to the database:', error);
    });
  }

  static get instance() {
    if(!Database._instance) {
      Database._instance = new Sequelize(DB_CONFIG);
    }
    return Database._instance;
  }
}
