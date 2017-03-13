const Koa = require('koa')
const app = new Koa()
const router = require('./router')
const config = require('./config')
const kcors = require('kcors')
app.use(kcors())

app.context.OK = function (data) {
  this.body = ({
    data,
    errcode: 0
  })
}
app.context.ERR = function (data) {
  this.body = ({
    data,
    errcode: 1
  })
}
app.use(async (ctx, next) => {
  try {
    await next()
  } catch (error) {
    ctx.ERR(error.message, error.status || 500)
  }
})
app.use(router.routes())
app.use(router.allowedMethods())

app.listen(config.app.port, () => console.log(`server starts on ${config.app.port}`))
