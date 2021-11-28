module.exports = {
  // eslint-disable-next-line
  up: async (queryInterface, Sequelize) => {
    const iposArray = [];

    iposArray.push({
      CompanyId: 1,
      price: 5,
      status: 'Open',
      amount: 50,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    iposArray.push({
      CompanyId: 2,
      price: 5,
      status: 'Open',
      amount: 10,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return queryInterface.bulkInsert('ipos', iposArray);
  },
  // eslint-disable-next-line
  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
