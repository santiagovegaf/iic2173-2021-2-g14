const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class request extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.companyItem = this.belongsTo(models.company, { as: 'companyItem', foreignKey: 'CompanyId' });
      this.userItem = this.belongsTo(models.user, { as: 'userItem', foreignKey: 'UserId' });
    }
  }
  request.init({
    UserId: DataTypes.INTEGER,
    CompanyId: DataTypes.INTEGER,
    type: DataTypes.STRING, // Purchase, Sale
    amount: DataTypes.INTEGER,
    price: DataTypes.FLOAT,
    status: DataTypes.STRING, // Open, Closed
    date: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'request',
  });
  return request;
};
