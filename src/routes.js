const KoaRouter = require('koa-router');
const jwt = require('koa-jwt');
const { apiSetCurrentUser } = require('./middlewares/auth');

const hello = require('./routes/hello');
const index = require('./routes/index');
const users = require('./routes/users');
const companies = require('./routes/companies');
const requests = require('./routes/requests');
const transactions = require('./routes/transactions');
const ipos = require('./routes/ipos');
const auth = require('./routes/auth');

const router = new KoaRouter();

router.use('/auth', auth.routes());

router.use(jwt({ secret: process.env.JWT_SECRET, key: 'authData' }));
router.use(apiSetCurrentUser);

router.use('/', index.routes());
router.use('/hello', hello.routes());
router.use('/users', users.routes());
router.use('/companies', companies.routes());
router.use('/requests', requests.routes());
router.use('/transactions', transactions.routes());
router.use('/ipos', ipos.routes());

module.exports = router;
