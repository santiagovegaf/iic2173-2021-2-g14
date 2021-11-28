const KoaRouter = require('koa-router');

const router = new KoaRouter();

router.get('users.get.all', '/', async (ctx) => {
  try {
    const users = await ctx.orm.user.findAll();
    ctx.body = users;
    ctx.status = 200;
  } catch (ValidationError) {
    ctx.throw(ValidationError);
  }
});

router.get('users.get.one', '/:id', async (ctx) => {
  try {
    const user = await ctx.orm.user.findByPk(ctx.params.id);
    if (user) {
      ctx.body = user;
      ctx.status = 200;
    } else {
      ctx.throw(404);
    }
  } catch (ValidationError) {
    ctx.throw(ValidationError);
  }
});

router.post('users.post.new.funds', '/:id/wallet', async (ctx) => {
  try {
    const user = await ctx.orm.user.findByPk(ctx.params.id);
    if (user) {
      const {
        ammount,
      } = ctx.request.body;
      const money = parseInt(user.money, 10) + parseInt(ammount, 10);
      await user.update({
        money,
      });
      ctx.status = 202;
    } else {
      ctx.throw(404);
    }
  } catch (ValidationError) {
    ctx.throw(ValidationError);
  }
});

router.patch('users.patch.one', '/:id', async (ctx) => {
  try {
    const user = await ctx.orm.user.findByPk(ctx.params.id);
    if (user) {
      const {
        name, money, email, password,
      } = ctx.request.body;
      await user.update({
        name, money, email, password,
      });
      ctx.status = 202;
    } else {
      ctx.throw(404);
    }
  } catch (ValidationError) {
    ctx.throw(ValidationError);
  }
});

router.post('users.create.one', '/', async (ctx) => {
  try {
    const {
      name, money, email, password,
    } = ctx.request.body;
    await ctx.orm.user.create({
      name, money, email, password,
    });
    ctx.status = 201;
  } catch (ValidationError) {
    ctx.throw(ValidationError);
  }
});

router.delete('users.delete.one', '/:id', async (ctx) => {
  try {
    const user = await ctx.orm.user.findByPk(ctx.params.id);
    if (user) {
      await user.destroy();
      ctx.status = 202;
    } else {
      ctx.throw(404);
    }
  } catch (ValidationError) {
    ctx.throw(ValidationError);
  }
});

module.exports = router;
