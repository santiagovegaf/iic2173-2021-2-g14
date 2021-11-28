const bcrypt = require('bcrypt');

const PASSWORD_SALT_ROUNDS = 10;

module.exports = {
  up: async (queryInterface) => {
    const usersArray = [];

    usersArray.push({
      name: 'Matias Mackenna',
      money: 100,
      email: 'matiasmackennad@uc.cl',
      password: await bcrypt.hash('Hola123', PASSWORD_SALT_ROUNDS),
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    usersArray.push({
      name: 'Pedro Mackenna',
      money: 100,
      email: 'pedro.mackenna@uc.cl',
      password: await bcrypt.hash('Hola123', PASSWORD_SALT_ROUNDS),
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return queryInterface.bulkInsert('users', usersArray);
  },

  down: async () => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
