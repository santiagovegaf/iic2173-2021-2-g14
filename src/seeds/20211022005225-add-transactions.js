module.exports = {
  up: async (queryInterface) => {
    const transactionsArray = [];

    transactionsArray.push({
      BuyerId: 1,
      SellerId: 2,
      CompanyId: 1,
      price: 10,
      amount: 5,
      date: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    transactionsArray.push({
      BuyerId: 2,
      SellerId: 1,
      CompanyId: 2,
      price: 10,
      amount: 5,
      date: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return queryInterface.bulkInsert('transactions', transactionsArray);
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
