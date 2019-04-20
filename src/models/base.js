export default {
  timestamps: false,
  defaultScope: {
    where: {
      isDeleted: 0
    }
  },
  hooks: {},
  scopes: {
    deletedRecord: {
      where: {
        isDeleted: 1
      }
    }
  },
};