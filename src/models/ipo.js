const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ipo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.companyItem = this.belongsTo(models.company, { as: 'companyItem', foreignKey: 'CompanyId' });
    }
  }
  ipo.init({
    CompanyId: DataTypes.INTEGER,
    price: DataTypes.FLOAT,
    status: DataTypes.STRING,
    amount: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'ipo',
  });
  return ipo;
};
