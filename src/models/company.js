const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class company extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.requestsArray = this.hasMany(models.request, { as: 'requestsArray', foreignKey: 'CompanyId' });
      this.transactionsArray = this.hasMany(models.transaction, { as: 'transactionsArray', foreignKey: 'CompanyId' });
    }
  }
  company.init({
    name: DataTypes.STRING,
    share_count: DataTypes.INTEGER,
    share_price: DataTypes.INTEGER,
    offered_shares: DataTypes.INTEGER,
    wallet: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'company',
  });
  return company;
};
