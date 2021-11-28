const KoaRouter = require('koa-router');

const router = new KoaRouter();

router.get('requests.get.all', '/', async (ctx) => {
  try {
    const requests = await ctx.orm.request.findAll();
    ctx.body = requests;
    ctx.status = 200;
  } catch (ValidationError) {
    ctx.throw(ValidationError);
  }
});

router.get('requests.get.purchase.requests', '/sales', async (ctx) => {
  // obtener ordenes de venta
  try {
    const requests = await ctx.orm.request.findAll({ where: { type: 'sale' } });
    if (requests) {
      ctx.body = requests;
      ctx.status = 200;
    } else {
      ctx.status = 404;
    }
  } catch (ValidationError) {
    ctx.throw(ValidationError);
  }
});

router.get('requests.get.purchase.requests', '/purchases', async (ctx) => {
  // obtener ordenes de venta (para comprar)
  try {
    const requests = await ctx.orm.request.findAll({ where: { type: 'purchase' } });
    if (requests) {
      ctx.body = requests;
      ctx.status = 200;
    } else {
      ctx.status = 404;
    }
  } catch (ValidationError) {
    ctx.throw(ValidationError);
  }
});

router.get('requests.get.one', '/:id', async (ctx) => {
  try {
    const request = await ctx.orm.request.findByPk(ctx.params.id);
    if (request) {
      ctx.body = request;
      ctx.status = 200;
    } else {
      ctx.throw(404);
    }
  } catch (ValidationError) {
    ctx.throw(ValidationError);
  }
});

router.get('requests.get.all.company', '/company/:cid', async (ctx) => {
  try {
    const requests = await ctx.orm.request.findAll({ where: { CompanyId: ctx.params.cid } });
    if (requests) {
      ctx.body = requests;
      ctx.status = 200;
    } else {
      ctx.throw(404);
    }
  } catch (ValidationError) {
    ctx.throw(ValidationError);
  }
});

router.get('requests.get.all.user', '/user/:uid', async (ctx) => {
  try {
    const requests = await ctx.orm.request.findAll({ where: { UserId: ctx.params.uid } });
    if (requests) {
      ctx.body = requests;
      ctx.status = 200;
    } else {
      ctx.throw(404);
    }
  } catch (ValidationError) {
    ctx.throw(ValidationError);
  }
});

router.patch('requests.patch.one', '/:id', async (ctx) => {
  try {
    const request = await ctx.orm.request.findByPk(ctx.params.id);
    if (request) {
      const {
        // eslint-disable-next-line camelcase
        UserId, CompanyId, type, amount, price, status, date,
      } = ctx.request.body;
      await request.update({
        UserId, CompanyId, type, amount, price, status, date,
      });
      ctx.status = 202;
    } else {
      ctx.throw(404);
    }
  } catch (ValidationError) {
    ctx.throw(ValidationError);
  }
});

router.post('requests.create.one', '/', async (ctx) => {
  try {
    const {
      // eslint-disable-next-line camelcase
      UserId, CompanyId, type, amount, price, status,
    } = ctx.request.body;
    const date = new Date();
    await ctx.orm.request.create({
      UserId, CompanyId, type, amount, price, status, date,
    });
    ctx.status = 201;
  } catch (ValidationError) {
    ctx.throw(ValidationError);
  }
});

router.delete('requests.delete.one', '/:id', async (ctx) => {
  try {
    const request = await ctx.orm.request.findByPk(ctx.params.id);
    if (request) {
      await request.destroy();
      ctx.status = 202;
    } else {
      ctx.throw(404);
    }
  } catch (ValidationError) {
    ctx.throw(ValidationError);
  }
});

module.exports = router;
