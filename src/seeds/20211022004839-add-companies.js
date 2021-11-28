module.exports = {
  up: async (queryInterface) => {
    const companiesArray = [];

    companiesArray.push({
      name: 'Nintendo',
      share_count: 50,
      share_price: 5,
      offered_shares: 10,
      wallet: 100,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    companiesArray.push({
      name: 'Sony',
      share_count: 50,
      share_price: 5,
      offered_shares: 10,
      wallet: 100,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return queryInterface.bulkInsert('companies', companiesArray);
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
