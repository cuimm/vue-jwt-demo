const express = require('express')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const CONFIG = require('./config')
const utils = require('./utils')

const app = express()

app.listen(CONFIG.PORT, () => {
  console.log(`监听端口：${CONFIG.PORT}`);
})

// 解决跨域中间件
app.use((req, res, next) => {
  // 允许的源
  res.header('Access-Control-Allow-Origin', CONFIG.HEADERS.CORS.ALLOW_ORIGIN)
  // 允许的请求方式
  res.header('Access-Control-Allow-Methods', CONFIG.HEADERS.CORS.ALLOW_METHODS)
  // 允许的请求头
  res.header('Access-Control-Allow-Headers', CONFIG.HEADERS.CORS.HEADERS)
  // 允许携带cookie
  res.header('Access-Control-Allow-Credentials', CONFIG.HEADERS.CORS.CREDENTIALS)

  res.header('Content-Type', 'application/json;charset=utf-8')
  res.header('X-Custom-Header-Cuimm', 'test-customize-header')
  next()
})

app.use(bodyParser.json())
const secret = '$cuimm$'

app.post('/api/login', (req, res) => {
  const { userName } = req.body
  // 如果用户名是admin，种植cookie
  if (userName === 'cuimm') {
    const data = {
      userName: 'cuimm',
      token: jwt.sign({ userName: 'cuimm', }, secret, { expiresIn: 20 })
    }
    res.send(utils.handleSuccessResponse(data))
  } else {
    res.json({
      code: 1,
      message: '用户名不存在'
    })
  }
})

app.get('/validate', (req, res) => {
  const token = req.headers.authorization
  jwt.verify(token, secret, (err, decode) => {
    if (err) {
      return res.json({
        code: 1,
        message: 'token失效了',
      })
    }
    return res.json(utils.handleSuccessResponse({
      userName: decode.userName,
      token: jwt.sign({ userName: 'cuimm' }, secret, {
        expiresIn: 20, // 延长token过期时间
      })
    }))
  })
})

app.get('/api/getUserInfo', (req, res) => {
  const userInfo = {
    name: 'cuimm',
    age: 18,
  }
  res.setHeader('myName', 'cuimm');
  res.send(utils.handleSuccessResponse(userInfo))
})
