const Koa = require('koa')
const Router = require('koa-router')
const views = require('co-views')

const render = views(__dirname + '/views',  { ext: 'ejs'})

const app = new Koa()

const router = new Router()

router.get('/', index)
router.get('/about', about)

async function index(ctx) {
  ctx.body = await render('index', {});
}

async function about(ctx) {
  console.log('Koa Context (this) has these properties: ');
  console.log(Object.keys(ctx));
  ctx.body = "<h2>This is the about route</h2>";
}

app.use(router.routes())



app.listen(3000)
