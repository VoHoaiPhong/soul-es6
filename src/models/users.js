import { DataTypes, Model } from 'sequelize';
import baseOptions from './base';
import { USERS, PLAYLISTS } from '../../constants';
import DateUtil from '../lib/date-util';
import uuidv4 from 'uuid/v4';

export class Users extends Model {
  static init(sequelize) {
    return super.init({
      id: {
        type: DataTypes.STRING(36),
        primaryKey: true,
        unique: true,
        allowNull: false,
        defaultValue: () => uuidv4()
      },
      username: {
        type: DataTypes.STRING(36),
        unique: true,
        allowNull: false
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      firstname: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      lastname: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      role: {
        type: DataTypes.STRING(10),
        allowNull: true
      },
      createdDate: {
        type: DataTypes.DATE,
        defaultValue: () => DateUtil.getUTCDateTime()
      },
      isDeleted: {
        type: DataTypes.INTEGER(1),
        defaultValue: 0
      }
    },
    {
      tableName: USERS,
      modelName: USERS,
      sequelize,
      ...baseOptions
    });
  }

  static associate(models) {
    return this.associations = {
      playlists: Users.hasMany(models[PLAYLISTS])
    };
  }
}