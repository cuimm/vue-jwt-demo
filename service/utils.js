const { BUSINESS_CODE } = require('./config')

const handleSuccessResponse = (data) => {
  return {
    code: BUSINESS_CODE.SUCCESS,
    data,
  }
}

module.exports = {
  handleSuccessResponse,
}
