const Router = require('koa-router')
const router = new Router()
const config = require('../config')
const crypto = require('crypto')

router.get('/policy', async (ctx) => {
  const dirPath = 'testOSS/' // 上传后例子：http://cqq.oss-cn-shenzhen.aliyuncs.com/testOSS/1489388301901，若为空，上传的文件则放到object的根目录
  const {OSSAccessKeyId, host, secret} = config.app.oss
  let end = new Date().getTime() + 300000
  let expiration = new Date(end).toISOString()
  let policyString = {
    expiration,
    conditions: [
      ['content-length-range', 0, 1048576000],
      ['starts-with', '$key', dirPath]
    ]
  }
  policyString = JSON.stringify(policyString)
  const policy = new Buffer(policyString).toString('base64')
  const signature = crypto.createHmac('sha1', secret).update(policy).digest('base64')
  ctx.OK({
    OSSAccessKeyId: OSSAccessKeyId,
    host,
    policy,
    signature,
    saveName: end,
    startsWith: dirPath
  })
})

module.exports = router
