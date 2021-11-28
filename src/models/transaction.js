const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.companyItem = this.belongsTo(models.company, { as: 'companyItem', foreignKey: 'CompanyId' });
      this.buyerItem = this.belongsTo(models.user, { as: 'buyerItem', foreignKey: 'BuyerId' });
      this.sellerItem = this.belongsTo(models.user, { as: 'sellerItem', foreignKey: 'SellerId' });
    }
  }
  transaction.init({
    BuyerId: DataTypes.INTEGER,
    SellerId: DataTypes.INTEGER,
    CompanyId: DataTypes.INTEGER,
    price: DataTypes.FLOAT,
    amount: DataTypes.INTEGER,
    date: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'transaction',
  });
  return transaction;
};
