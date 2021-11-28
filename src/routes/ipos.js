const KoaRouter = require('koa-router');

const router = new KoaRouter();

router.get('ipos.get.all', '/', async (ctx) => {
  try {
    const ipos = await ctx.orm.ipo.findAll();
    ctx.body = ipos;
    ctx.status = 200;
  } catch (ValidationError) {
    ctx.throw(ValidationError);
  }
});

router.get('ipos.get.one', '/:id', async (ctx) => {
  try {
    const ipo = await ctx.orm.ipo.findByPk(ctx.params.id);
    if (ipo) {
      ctx.body = ipo;
      ctx.status = 200;
    } else {
      ctx.throw(404);
    }
  } catch (ValidationError) {
    ctx.throw(ValidationError);
  }
});

router.get('ipos.get.all.company', '/company/:cid', async (ctx) => {
// obtener todas las ipos de una empresa
  try {
    const ipos = await ctx.orm.ipo.findAll({ where: { CompanyId: ctx.params.cid } });
    if (ipos) {
      ctx.body = ipos;
      ctx.status = 200;
    } else {
      ctx.throw(404);
    }
  } catch (ValidationError) {
    ctx.throw(ValidationError);
  }
});

router.patch('ipos.patch.one', '/:id', async (ctx) => {
  try {
    const ipo = await ctx.orm.ipo.findByPk(ctx.params.id);
    if (ipo) {
      const {
        // eslint-disable-next-line camelcase
        CompanyId, price, status, amount,
      } = ctx.request.body;
      await ipo.update({
        CompanyId, price, status, amount,
      });
      ctx.status = 202;
    } else {
      ctx.throw(404);
    }
  } catch (ValidationError) {
    ctx.throw(ValidationError);
  }
});

router.post('ipos.create.one', '/', async (ctx) => {
  try {
    const {
      // eslint-disable-next-line camelcase
      CompanyId, price, status, amount,
    } = ctx.request.body;
    // const date = new Date();
    // se usa createdAt
    await ctx.orm.ipo.create({
      CompanyId, price, status, amount,
    });
    ctx.status = 201;
  } catch (ValidationError) {
    ctx.throw(ValidationError);
  }
});

router.delete('ipos.delete.one', '/:id', async (ctx) => {
  try {
    const ipo = await ctx.orm.ipo.findByPk(ctx.params.id);
    if (ipo) {
      await ipo.destroy();
      ctx.status = 202;
    } else {
      ctx.throw(404);
    }
  } catch (ValidationError) {
    ctx.throw(ValidationError);
  }
});

module.exports = router;
