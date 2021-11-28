const KoaRouter = require('koa-router');

const router = new KoaRouter();

router.get('companies.get.all', '/', async (ctx) => {
  try {
    const companies = await ctx.orm.company.findAll();
    ctx.body = companies;
    ctx.status = 200;
  } catch (ValidationError) {
    ctx.throw(ValidationError);
  }
});

router.get('companies.get.one', '/:id', async (ctx) => {
  try {
    const company = await ctx.orm.company.findByPk(ctx.params.id);
    if (company) {
      ctx.body = company;
      ctx.status = 200;
    } else {
      ctx.status = 404;
    }
  } catch (ValidationError) {
    ctx.throw(ValidationError);
  }
});

router.patch('companies.patch.one', '/:id', async (ctx) => {
  try {
    const company = await ctx.orm.company.findByPk(ctx.params.id);
    if (company) {
      const {
        // eslint-disable-next-line camelcase
        name, share_count, share_price, offered_shares, wallet,
      } = ctx.request.body;
      await company.update({
        name, share_count, share_price, offered_shares, wallet,
      });
      ctx.status = 202;
    } else {
      ctx.status = 404;
    }
  } catch (ValidationError) {
    ctx.throw(ValidationError);
  }
});

router.post('companies.create.one', '/', async (ctx) => {
  try {
    const {
      // eslint-disable-next-line camelcase
      name, share_count, share_price, offered_shares, wallet,
    } = ctx.request.body;
    await ctx.orm.company.create({
      name, share_count, share_price, offered_shares, wallet,
    });
    ctx.status = 201;
  } catch (ValidationError) {
    ctx.throw(ValidationError);
  }
});

router.delete('companies.delete.one', '/:id', async (ctx) => {
  try {
    const company = await ctx.orm.company.findByPk(ctx.params.id);
    if (company) {
      await company.destroy();
      ctx.status = 202;
    } else {
      ctx.status = 404;
    }
  } catch (ValidationError) {
    ctx.throw(ValidationError);
  }
});

module.exports = router;
