import axios from 'axios';
import { BUSINESS_CODE } from '../config/index';

const defaultConfig = {
  timeout: 10000,
  baseURL: process.env.VUE_APP_SERVICE_DEFAULT,
  withCredentials: true, // 允许携带cookie，前后端需要同时设置（会自动携带同源cookie）
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    'X-Custom-Header-Cuimm': 'this is test~',
  },
};

class AxiosInstanceFactory {
  constructor(options, { silent, noInterceptor } = {}) {
    // axios请求配置
    this.options = Object.assign({}, options, defaultConfig)
    // 是否静默
    this.silent = silent
    // 是否拦截器
    this.noInterceptor = noInterceptor
  }

  getInstance() {
    const instance = axios.create(this.options);
    if (this.noInterceptor) {
      return instance
    }
    instance.interceptors.request.use(
      AxiosInstanceFactory.requestSuccessInterceptor,
      AxiosInstanceFactory.requestErrorInterceptor,
    )
    instance.interceptors.response.use(
      AxiosInstanceFactory.responseSuccessInterceptor,
      AxiosInstanceFactory.responseErrorInterceptor,
    );
    return instance;
  }

  static requestSuccessInterceptor(config) {
    // 携带token
    config.headers.Authorization = localStorage.getItem('token')
    return config
  }

  static requestErrorInterceptor(error) {
    return Promise.reject(error)
  }

  static responseSuccessInterceptor(response) {
    if (response && response.data && response.data.code === BUSINESS_CODE.SUCCESS) {
      return Promise.resolve(response.data)
    }
    return Promise.reject(response)
  }

  static responseErrorInterceptor(error) {
    return Promise.reject(error)
  }
}

export default {
  $api: new AxiosInstanceFactory().getInstance(),
}
