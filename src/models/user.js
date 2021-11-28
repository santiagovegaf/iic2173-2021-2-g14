const {
  Model,
} = require('sequelize');

const bcrypt = require('bcrypt');

const PASSWORD_SALT_ROUNDS = 10;

module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.requestsArray = this.hasMany(models.request, { as: 'requestsArray', foreignKey: 'UserId' });
      this.buyerArray = this.hasMany(models.transaction, { as: 'buyerArray', foreignKey: 'BuyerId' });
      this.sellerArray = this.hasMany(models.transaction, { as: 'sellerArray', foreignKey: 'SellerId' });
    }

    async checkPassword(password) {
      return bcrypt.compare(password, this.password);
    }
  }
  user.init({
    name: DataTypes.STRING,
    money: DataTypes.INTEGER,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'user',
  });
  user.beforeSave(async (instance) => {
    if (instance.changed('password')) {
      const hash = await bcrypt.hash(instance.password, PASSWORD_SALT_ROUNDS);
      instance.set('password', hash);
    }
  });

  return user;
};
