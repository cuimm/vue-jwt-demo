module.exports = {
  PORT: 3000,
  HEADERS: {
    CORS: {
      ALLOW_ORIGIN: 'http://test2.cuimm.com:8081',
      ALLOW_METHODS: 'GET,POST,PUT,OPTIONS,HEAD,DELETE',
      HEADERS: 'Content-Type,Content-Length,Authorization,X-Custom-Header-Cuimm',
      CREDENTIALS: true,
    },
  },
  BUSINESS_CODE: {
    SUCCESS: 0,
  },
}
