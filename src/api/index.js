import axios from 'axios'
import qs from 'querystring'
// 设置公共请求前缀
axios.defaults.baseURL = 'https://www.ehomespace.com/api/public/v1'
// 设置请求头token
axios.defaults.headers.common['Authorization'] = sessionStorage.getItem('token')

// 获取首页轮播图
export const getHomeCarousel = () => axios.get('/home/swiperdata')
// 获取首页商品列表数据
export const getHomeGoodslist = () => axios.get('/home/goodslist')
// 获取商品详情
export const getGoogdDetail = (id) => axios.get('/goods/detail?goods_id=' + id)
// 登录账号
export const submitLogin = (userInfoObj) => axios.post('/login', qs.stringify(userInfoObj))
// 注册账号
export const submitRegister = (registerObj) => axios.post('/users/reg',qs.stringify(registerObj))
// 获取验证码
export const getVerigyCode = mobile => axios.post('/users/get_reg_code', qs.stringify({mobile}))
// 搜索商品
export const searchGoods = value => axios.get('/goods/search?' + value)
// 搜索建议查询
export const searchSuggest = value => axios.get('/goods/search?query=' + value)
// 获取购物车数据
export const getCartGoods = () => axios.get('/my/cart/all')
// 添加购物车
export const addCart = goodsInfo => axios.post('/my/cart/add', goodsInfo)
// 同步购物车
export const syncCart = infos => axios.post('/my/cart/sync', infos)
// 创建订单
export const createOrder = goodsInfo => axios.post('/my/orders/create', goodsInfo)
// 获取订单my/orders/all
export const getOrder = () => axios.get('my/orders/all')
// 获取用户信息
export const getUserInfo = () => axios.get('/my/users/userinfo')