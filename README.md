<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="150" alt="Nest Logo" /></a>
</p>

## Tips

请自行在根目录下创建文件.env

```
# 启动端口
PORT=8090

# 数据库配置
DB_HOST="127.0.0.1"
DB_PORT=3306
DB_DATABASE="test"
DB_USERNAME="root"
DB_PASSWORD="lh@19870929"

# jwt配置
JWT_SECRET=yaoyao917 # 用于加密签名的密钥，非常重要，确保它是随机的且不被泄露
JWT_EXPIRATION_TIME=24h # 令牌过期时间（以秒为单位）
```

## 模块

1. 连接mysql
2. 配置.env
3. 全局请求拦截器
4. 全局响应拦截器
5. 图片上传/删除
6. jwt生成和验证
