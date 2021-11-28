module.exports = {
  up: async (queryInterface) => {
    const requestsArray = [];

    requestsArray.push({
      UserId: 1,
      CompanyId: 1,
      type: 'Purchase',
      amount: 5,
      price: 10,
      status: 'Open',
      date: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    requestsArray.push({
      UserId: 2,
      CompanyId: 1,
      type: 'Purchase',
      amount: 5,
      price: 10,
      status: 'Open',
      date: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return queryInterface.bulkInsert('requests', requestsArray);
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
