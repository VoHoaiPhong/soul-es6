import { DataTypes, Model } from 'sequelize';
import baseOptions from './base';
import DateUtil from '../lib/date-util';
import { PLAYLISTS, USERS, VIDEOS } from '../../constants';
import uuidv4 from 'uuid/v4';

export class Playlists extends Model {
  static init(sequelize) {
    return super.init({
      id: {
        type: DataTypes.STRING(36),
        primaryKey: true,
        unique: true,
        allowNull: false,
        defaultValue: () => uuidv4()
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false
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
      tableName: PLAYLISTS,
      modelName: PLAYLISTS,
      ...baseOptions,
      sequelize
    });
  }

  static associate(models) {
    return this.associations = {
      videos: Playlists.hasMany(models[VIDEOS]),
      users: Playlists.belongsTo(models[USERS])
    };
  }
}