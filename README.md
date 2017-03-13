# oss-upload-nodejs
## 阿里云OSS服务端签名后直传
由于采用JS客户端直接签名严重的安全隐患，OSSAccessId和AccessKeySecret暴露在前端页面，可以随意被拿到因此不安全。由于阿里云OSS开发文档只提供了Java，PHP，Python和Go语言的例子，因此本Demo提供一个以Node.js作为后端的例子。
***
###请求逻辑：
1. 客户端要上传图片时，到应用服务器取上传的policy及签名(signature)
2. 应用服务器返回上传policy和signature
3. 客户端拿到了签名后，直接上传到OSS

###目前支持
chrome, firefox浏览器，其他主流浏览器还未全面测试
文件上传进度
##使用
###配置OSS
1. 进入阿里云管理控制台 --> 对象存储OSS
2. 新建Bucket
3. Bucket属性 --> 跨域设置：
来源 | Method | Allow Header | Expose Header | 缓存时间
:---: | :---: | :---: | :---: | :---:
* | GET,POST | * | | 600
:---:|:---:|:---:|:---:|:---:
###查看自己的AccessKey
![image](./images/accesskey.png)
![image](./images/accesskey2.png)
点击显示，会弹出短信验证窗口，验证后即可显示出你的AccessKeySecret
###后端配置文件
```
backend/src/config/development/app.js

module.exports = {
  port: 3602,
  oss: {
    OSSAccessKeyId: '【这里填你阿里云的Access Key ID】',
    secret: '【这里填你阿里云的Access Key Secret】',
    host: 'http://cqq.oss-cn-shenzhen.aliyuncs.com' //改为你自己阿里云OSS的外网域名
  }
}

```
##技术栈
- [koa](http://koajs.com/)
- [koa-router](https://github.com/alexmingoia/koa-router)
- [vue](http://cn.vuejs.org/)
- [vue-router](https://router.vuejs.org/)
- [axios](https://github.com/mzabriskie/axios)
##单个图片上传页面，上传后显示图片预览
![image](./images/localhost.png)


