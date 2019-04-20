import { DataTypes, Model } from 'sequelize';
import baseOptions from './base';
import DateUtil from '../lib/date-util';
import { VIDEOS, PLAYLISTS } from '../../constants';
import uuidv4 from 'uuid/v4';

export class Videos extends Model {
  static init(sequelize) {
    return super.init({
      id: {
        type: DataTypes.STRING(36),
        primaryKey: true,
        unique: true,
        allowNull: false,
        defaultValue: () => uuidv4()
      },
      youtubeId: {
        type: DataTypes.STRING(11),
        allowNull: false
      },
      status: {
        type: DataTypes.INTEGER(1),
        defaultValue: 0
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
      tableName: VIDEOS,
      modelName: VIDEOS,
      sequelize,
      ...baseOptions
    });
  }

  static associate(models) {
    return this.associations = {
      playlists: Videos.belongsTo(models[PLAYLISTS])
    };
  }
}