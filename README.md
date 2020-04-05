jsonwebtoken
    可以实现 token 的生成与反向解密出用户数据

cookie 
* 客户端请求怎么携带cookie
    规则是：存取cookie的只能在本域名或者父级域名下才能生效
1. ajax请求不会自动携带cookie的，如果想要携带cookie，前端必须设置请求头：withCredentials：true，后端必须设置请求头：Access-Control-Allow-Credentials：true
2. ajax会自动带上同源的cookie，非同源下的cookie会自动携带本域或者父级域名下的cookie。
         例如：前端a.test域：a.test.com  |  后端b.test域名：b.test.com
        请求b.test.com域接口，会携带包括以下domain的cookie：b.test.com、.test.com（注意：这个域前面有个.点），即：会携带domain包含当前请求后端域名的cookie。大于等于当前域名（*.test.com）。
        存：只能存当前域名（b.test.com）或者父级域名（.test.com）的cookie
        取：只能取当前域名（b.test.com）或者父级域名（.test.com）的cookie


声明三个域名:
    test.com：此为顶级域名
    article.test.com：二级域名
    passport.test.com：二级域名

1、访问 test.com 域名时，可以存取此域名的cookie，但是不能设置二级域名的cookie
2、访问 article.test.com 域名时，可存取此域名的cookie，也可以存取顶级域名 (父域名)test.com 的cookie。
   也就说，子域名共享顶级域名(父域名)的cookie。
3、在访问 article.test.com 域名时，不能设置 passport.test.com 域名的cookie，就算设置了，浏览器也不会生效该设置。

设置cookie：
function setCookie(name, value, expiration, path = '/', domain) {
  let data = `${name}=${value};`
  if (expiration) {
    data += `expires=${new Date(Date.now() + expiration)};`
  }
  path && (data += `path=${path};`)
  domain && (data += `domain=${domain}`)
  document.cookie = data
}

假设当前域名为blog.xiaoming.com，经测试发现，JS在写入cookie时：
xei.setCookie('test1', 'abcd', 30, '/');                     // 成功，默认写入当前域名
xei.setCookie('test2', 'abcd', 30, '/', 'blog.xiaoming.com');    // 成功，前面追加一个“.”
xei.setCookie('test3', 'abcd', 30, '/', 'abcd.xiaoming.com');    // 写入不成功
xei.setCookie('test4', 'abcd', 30, '/', '.xiaoming.com');        // 成功
xei.setCookie('test5', 'abcd', 30, '/', 'xiaoming.com');         // 成功，前面追加一个“.”
xei.setCookie('test6', 'abcd', 30, '/', 'www.qq.com');       // 写入不成功

结果：


说明：
    1、不传domain，默认当前域名
    2、只要传了domain，则会强制在前面加上一个.，不管是一级还是二级域名
    3、domain只能是当前域名，或者是父级域名，否则写入不成功
