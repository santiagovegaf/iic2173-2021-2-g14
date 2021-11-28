/* eslint-disable no-param-reassign */
async function makeTransaction(ctx, purchase, sale, BuyerId, amount, price) {
  const buyer = await ctx.orm.user.findByPk(BuyerId);
  if (sale.UserId) {
    const seller = await ctx.orm.user.findByPk(sale.UserId);
    await ctx.orm.transaction.create({
      BuyerId: buyer.id,
      SellerId: seller.id,
      CompanyId: purchase.CompanyId,
      date: new Date(),
      amount,
      price,
    });
    if (amount === sale.amount) {
      await sale.update({ status: 'Closed' });
    } else {
      await sale.update({ amount: sale.amount - amount });
    }
    await seller.update({ money: seller.money + amount * price });
    await buyer.update({ money: buyer.money - amount * price });
  } else {
    const seller = await ctx.orm.company.findByPk(purchase.CompanyId);
    await ctx.orm.transaction.create({
      BuyerId: buyer.id,
      SellerId: null,
      CompanyId: purchase.CompanyId,
      date: new Date(),
      amount,
      price,
    });
    if (amount === sale.amount) {
      await sale.update({ status: 'Closed' });
    } else {
      await sale.update({ amount: sale.amount - amount });
    }
    await seller.update({ wallet: seller.wallet + amount * price });
    await buyer.update({ money: buyer.money - amount * price });
  }
}

module.exports = {
  makeTransaction,
};
