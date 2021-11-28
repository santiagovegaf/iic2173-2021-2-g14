/* eslint-disable no-await-in-loop */
const KoaRouter = require('koa-router');
const { Op } = require('sequelize');
const { makeTransaction } = require('../helpers/transactions');

const router = new KoaRouter();

router.get('transactions.get.all', '/', async (ctx) => {
  try {
    const transactions = await ctx.orm.transaction.findAll();
    ctx.body = transactions;
    ctx.status = 200;
  } catch (ValidationError) {
    ctx.throw(ValidationError);
  }
});

router.get('transactions.get.one', '/:id', async (ctx) => {
  try {
    const transaction = await ctx.orm.transaction.findByPk(ctx.params.id);
    if (transaction) {
      ctx.body = transaction;
      ctx.status = 200;
    } else {
      ctx.throw(404);
    }
  } catch (ValidationError) {
    ctx.throw(ValidationError);
  }
});

router.get('transactions.get.all.company', '/company/:cid', async (ctx) => {
  try {
    const transactions = await ctx.orm.transaction.findAll(
      { where: { CompanyId: ctx.params.cid } },
    );
    if (transactions) {
      ctx.body = transactions;
      ctx.status = 200;
    } else {
      ctx.throw(404);
    }
  } catch (ValidationError) {
    ctx.throw(ValidationError);
  }
});

router.get('transactions.get.all.user', '/buyer/:uid', async (ctx) => {
  try {
    const transactions = await ctx.orm.transaction.findAll({ where: { BuyerId: ctx.params.uid } });
    if (transactions) {
      ctx.body = transactions;
      ctx.status = 200;
    } else {
      ctx.throw(404);
    }
  } catch (ValidationError) {
    ctx.throw(ValidationError);
  }
});

router.get('transactions.get.all.user', '/seller/:uid', async (ctx) => {
  try {
    const transactions = await ctx.orm.transaction.findAll({ where: { SellerId: ctx.params.uid } });
    if (transactions) {
      ctx.body = transactions;
      ctx.status = 200;
    } else {
      ctx.throw(404);
    }
  } catch (ValidationError) {
    ctx.throw(ValidationError);
  }
});

router.patch('transactions.patch.one', '/:id', async (ctx) => {
  try {
    const transaction = await ctx.orm.transaction.findByPk(ctx.params.id);
    if (transaction) {
      const {
        // eslint-disable-next-line camelcase
        BuyerId, SellerId, CompanyId, amount, date,
      } = ctx.request.body;
      await transaction.update({
        BuyerId, SellerId, CompanyId, amount, date,
      });
      ctx.status = 202;
    } else {
      ctx.throw(404);
    }
  } catch (ValidationError) {
    ctx.throw(ValidationError);
  }
});

router.post('transactions.create', '/', async (ctx) => {
  try {
    const purchases = await ctx.orm.request.findAll({ where: { type: 'Purchase', status: 'Open' } });
    purchases.sort((p) => -p.price);
    let buyer;
    let ipos;
    let purchase;
    let sales;
    let index1 = 0;
    while (index1 < purchases.length) {
      purchase = purchases[index1];
      buyer = await ctx.orm.user.findByPk(purchase.UserId);
      if (buyer.money >= purchase.amount * purchase.price) {
        sales = await ctx.orm.request.findAll({
          where: {
            type: 'Sale',
            status: 'Open',
            CompanyId: purchase.CompanyId,
            price:
            { [Op.lte]: purchase.price },
          },
        });
        ipos = await ctx.orm.ipo.findAll({
          where: {
            status: 'Open',
            CompanyId: purchase.CompanyId,
            price: {
              [Op.lte]: purchase.price,
            },
          },
        });
        sales = sales.concat(ipos);
        sales.sort((p) => -p.price);
        let number = purchase.amount;
        let index = 0;
        while (number !== 0 && index < sales.length) {
          let { price } = sales[index];
          if (price < purchase.price) { price = purchase.price; }
          if (number <= sales[index].amount) {
            await makeTransaction(ctx, purchase, sales[index], buyer.id, number, price);
            await purchase.update({ status: 'Closed' });
            number = 0;
          } else {
            await makeTransaction(
              ctx, purchase, sales[index], buyer.id, sales[index].amount, price,
            );
            await purchase.update({ amount: purchase.amount - sales[index].amount });
            number -= sales[index].amount;
          }
          index += 1;
        }
      }
      index1 += 1;
    }
    ctx.status = 200;
  } catch (ValidationError) {
    ctx.throw(ValidationError);
  }
});

router.delete('transactions.delete.one', '/:id', async (ctx) => {
  try {
    const transaction = await ctx.orm.transaction.findByPk(ctx.params.id);
    if (transaction) {
      await transaction.destroy();
      ctx.status = 202;
    } else {
      ctx.throw(404);
    }
  } catch (ValidationError) {
    ctx.throw(ValidationError);
  }
});

module.exports = router;
