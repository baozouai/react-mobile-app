# 1. 电商移动前端API文档
说明：如果接口不能用，可以去github搜索'/api/public/v1/home/swiperdata',查询最新的代码，找到前缀如'https://api-hmugo-web.itheima.net',测试是否可用
## 1.1. 路径说明
- 基准路径为https://api-hmugo-web.itheima.net/api/public/v1
- 访问路径分为两种（其中私有路径必须登录后才可以访问）
    + 公开路径https://api-hmugo-web.itheima.net/api/public/v1
    + 私有路径https://api-hmugo-web.itheima.net/api/public/v1/my

- 登录认证模式采用**jwt**(json web token)，实现流程为
  1. 请求登录
  2. 获取token
  3. 访问有权限的路径必须把 token 放置到 http 头中
  ```
  	"Authorization" : token
  ```
  4. **token 有一定有效期**，如果服务器返回 token 无效则需要重新登录

## 1.2. 公开路径
### 1.2.1. 主页API
#### 1.2.1.1. 获取首页轮播图数据
- 请求路径https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata
- 请求方法：get
- 响应参数

| 参数名        | 参数说明   | 备注 |
| ------------- | ---------- | ---- |
| image_src     | 轮播图地址 |      |
| open_type     | 打开方式   |      |
| navigator_url | 导航链接   |      |

- 响应数据

```json
{
  "data": [
    {
      "image_src": "http://p6lmyfkof.bkt.clouddn.com/banner1.png",
      "open_type": "navigate",
      "navigator_url": "/pages/goods_detail?goods_id=55578"
    },
    {
      "image_src": "http://p6lmyfkof.bkt.clouddn.com/banner2.png",
      "open_type": "navigate",
      "navigator_url": "/pages/goods_detail?goods_id=17927"
    },
    {
      "image_src": "http://p6lmyfkof.bkt.clouddn.com/banner3.png",
      "open_type": "navigate",
      "navigator_url": "/pages/goods_detail?goods_id=51216"
    }
  ],
  "meta": {
    "msg": "获取成功",
    "status": 200
  }
}
```

#### 1.2.1.2. 获取首页分类菜单数据
- 请求路径：https://api-hmugo-web.itheima.net/api/public/v1/home/catitems
- 请求方法：get
- 响应参数

| 参数名        | 参数说明 | 备注 |
| ------------- | -------- | ---- |
| name          | 名称     |      |
| image_src     | 图标路径 |      |
| open_type     | 打开方式 |      |
| navigator_url | 导航页面 |      |
| meta          | 请求状态 |      |

- 响应数据

```json
{
  "data": [
    {
      "name": "分类",
      "image_src": "http://p6lmyfkof.bkt.clouddn.com/icon_index_nav_4@2x.png",
      "open_type": "switchTab",
      "navigator_url": "/pages/category"
    },
    {
      "name": "秒杀拍",
      "image_src": "http://p6lmyfkof.bkt.clouddn.com/icon_index_nav_3@2x.png",
      "open_type": "navigate",
      "navigator_url": "/pages/goods_list?query=秒杀"
    },
    {
      "name": "超市购",
      "image_src": "http://p6lmyfkof.bkt.clouddn.com/icon_index_nav_2@2x.png",
      "open_type": "navigate",
      "navigator_url": "/pages/goods_list?query=超市"
    },
    {
      "name": "母婴品",
      "image_src": "http://p6lmyfkof.bkt.clouddn.com/icon_index_nav_1@2x.png",
      "open_type": "navigate",
      "navigator_url": "/pages/goods_list?query=母婴"
    }
  ],
  "meta": {
    "msg": "获取成功",
    "status": 200
  }
}
```

#### 1.2.1.3. 获取首页商品列表数据
- 请求路径：https://api-hmugo-web.itheima.net/api/public/v1/home/goodslist
- 请求方法：get
- 响应参数

| 参数名      | 参数说明   | 备注       |
| -------- | ------ | -------- |
| group_img       | 组头图片路径   |          |
| goods_id       | 商品ID   |          |
| goods_name       | 商品名称   |          |
| goods_price       | 商品价格   |          |
| goods_big_logo       | 商品大尺寸图片路径   |          |
| goods_small_logo       | 商品小尺寸图片路径  |          |
| cat_id       | 商品分类ID   |          |

- 响应数据

```json
{
  "data": [
    {
      "group_img": "http://image4.suning.cn/uimg/cms/img/149559219946350066.png",
      "goods": [
        {
          "goods_id": 27520,
          "goods_name": "哈曼卡顿（Harman/Kardon） SABRE35CN 条形回音壁套装 黑色",
          "goods_price": 7999,
          "goods_big_logo": "http://image5.suning.cn/uimg/b2c/newcatentries/0070072458-000000000134974159_1_800x800.jpg",
          "goods_small_logo": "http://image5.suning.cn/uimg/b2c/newcatentries/0070072458-000000000134974159_1_400x400.jpg",
          "cat_id": 20
        }
      ]
    }
  ],
  "meta": {
    "msg": "获取成功",
    "status": 200
  }
}
```

### 1.2.2. 商品API
#### 1.2.2.1. 搜索建议查询
- 请求路径：https://api-hmugo-web.itheima.net/api/public/v1/goods/qsearch
- 请求方法：get

- 请求参数

| 参数名      | 参数说明 | 备注   |
| -------- | ---- | ---- |
| query       | 查询内容   |          |

- 响应参数

| 参数名      | 参数说明   | 备注       |
| -------- | ------ | -------- |
| goods_id       | 商品ID   |          |
| goods_name       | 商品名称   |          |



#### 1.2.2.2. 商品列表搜索
- 请求路径：https://api-hmugo-web.itheima.net/api/public/v1/goods/search
- 请求方法：get

- 请求参数

| 参数名      | 参数说明 | 备注   |
| -------- | ---- | ---- |
| query       | 查询关键词   |          |
| cid       | 分类ID   |      可选    |
| pagenum       | 页数索引   |  可选默认第一页        |
| pagesize       | 每页长度   |  可选默认20条       |

- 响应参数

| 参数名      | 参数说明   | 备注       |
| -------- | ------ | -------- |
| total       | 总共记录   |          |
| pagenum       | 当前页数   |          |
| goods_id       | 商品ID   |          |
| cat_id       | 分类ID   |          |
| goods_name       | 商品名称   |          |
| goods_price       | 商品价格   |          |
| goods_number       | 商品数量   |          |
| goods_weight       | 商品重量   |          |
| goods_big_logo       | 商品大图标   |          |
| goods_small_logo       | 商品小图标   |          |
| add_time       | 商品添加时间   |          |
| upd_time       | 商品更新时间   |          |
| hot_mumber       | 热门商品数   |          |
| cat_one_id       | 所属一级分类   |          |
| cat_two_id       | 所属二级分类   |          |
| cat_three_id       | 所属三级分类   |          |



#### 1.2.2.3. 商品详情
- 请求路径：https://api-hmugo-web.itheima.net/api/public/v1/goods/detail
- 请求方法：get

- 请求参数

| 参数名      | 参数说明 | 备注   |
| -------- | ---- | ---- |
| goods_id       | 商品ID   |  必填       |

- 响应参数

| 参数名      | 参数说明   | 备注       |
| -------- | ------ | -------- |
| goods_id       | 商品ID   |          |
| cat_id       | 分类ID   |          |
| goods_name       | 商品名称   |          |
| goods_price       | 商品价格   |          |
| goods_number       | 商品数量   |          |
| goods_weight       | 商品重量   |          |
| goods_big_logo       | 商品大图标   |          |
| goods_small_logo       | 商品小图标   |          |
| add_time       | 商品添加时间   |          |
| upd_time       | 商品更新时间   |          |
| hot_mumber       | 热门商品数   |          |
| cat_one_id       | 所属一级分类   |          |
| cat_two_id       | 所属二级分类   |          |
| cat_three_id       | 所属三级分类   |          |
| goods_introduce       | 商品介绍   |          |
| pics       | 商品图片列表   |          |
| attrs       | 商品属性列表   |          |


- 响应数据

```json

```

### 1.2.3. 分类API
#### 1.2.3.1. 获取分类数据
- 请求路径：https://api-hmugo-web.itheima.net/api/public/v1/categories
- 请求方法：get
- 响应参数

| 参数名      | 参数说明   | 备注       |
| -------- | ------ | -------- |
| cat_id       | 分类ID   |          |
| cat_pid | 父级ID | |
| cat_name       | 分类名称   |          |
| cat_level       | 分类级别   |          |
| cat_icon       | 分类图标   | 需要加上接口地址前缀 |
| children       | 子分类列表   |          |



### 1.2.4. 用户API
#### 1.2.4.1. 获取验证码
- 请求路径：https://api-hmugo-web.itheima.net/api/public/v1/users/get_reg_code
- 请求方法：post

- 请求参数

| 参数名      | 参数说明 | 备注   |
| -------- | ---- | ---- |
| mobile       | 手机号   |   必填       |

- 响应参数

| 参数名      | 参数说明   | 备注       |
| -------- | ------ | -------- |
| data       | 调试模式下使用查看验证码数字，真是情况下无此参数   |          |



#### 1.2.4.2. 注册
- 请求路径：https://api-hmugo-web.itheima.net/api/public/v1/users/reg
- 请求方法：post

- 请求参数

| 参数名      | 参数说明 | 备注   |
| -------- | ---- | ---- |
| mobile       | 手机号   |   必填       |
| code       | 验证码   |   必填       |
| email       | 邮箱   |   必填       |
| pwd       | 密码   |   必填       |
| gender       | 性别   |   必填       |

- 响应数据

```javascript
{
    "meta": {
        "msg": "注册成功",
        "status": 200
    }
}
```

#### 1.2.4.3. 登录
- 请求路径：https://api-hmugo-web.itheima.net/api/public/v1/login
- 请求方法：post

- 请求参数

| 参数名      | 参数说明 | 备注   |
| -------- | ---- | ---- |
| username       | 用户名   |   必填       |
| password       | 密码   |   必填       |

- 响应参数

| 参数名      | 参数说明   | 备注       |
| -------- | ------ | -------- |
| user_id       | 用户ID   |          |
| username       | 用户名   |          |
| user_email       | 用户邮箱   |          |
| user_tel       | 用户电话   |          |
| token       | 全局token   |          |
| mobile       | 用户手机号   |          |



## 1.3. 私有路径
### 1.3.1. 用户API
#### 1.3.1.1. 获取用户信息
- 请求路径：https://api-hmugo-web.itheima.net/api/public/v1/my/users/userinfo
- 请求方法：get
- 响应参数

| 参数名      | 参数说明   | 备注       |
| -------- | ------ | -------- |
| user_id       | 用户ID   |          |
| username       | 用户名   |          |
| user_email       | 用户邮箱   |          |
| user_tel       | 用户电话   |          |
| mobile       | 用户手机号   |          |

### 1.3.2. 购物车API（登录后访问）
#### 1.3.2.1. 查询购物车数据
- 请求路径：https://api-hmugo-web.itheima.net/api/public/v1/my/cart/all
- 请求方法：get
- 响应参数

#### 1.3.2.2. 购物车添加商品
- 请求路径：https://api-hmugo-web.itheima.net/api/public/v1/my/cart/add
- 请求方法：post
- 请求参数

| 参数名      | 参数说明 | 备注   |
| -------- | ---- | ---- |
| info       | 商品对象的JSON字符串   |          |

需要用到的商品对象的属性如下



| info的属性       |          |      |
| ---------------- | -------- | ---- |
| cat_id           | 分类id   |      |
| goods_id         | 商品的id |      |
| goods_name       | 商品名称 |      |
| goods_number     | 商品数量 |      |
| goods_price      | 商品价格 |      |
| goods_small_logo | 商品图片 |      |
| goods_weight     | 商品重量 |      |



- 请求数据
```javascript
{
	{
   info: {"cat_id":1358,"goods_id":20383,"goods_name":"苹果（Apple）原装耳机iphone6s/5/ SE /Plus/ipad4air带麦克风线控耳塞入耳式","goods_number":100,"goods_price":68,"goods_weight":100,"goods_small_logo":"http://image3.suning.cn/uimg/b2c/newcatentries/0070130691-000000000141900496_1_400x400.jpg"}
	}
}
```
- 响应参数

| 参数名      | 参数说明   | 备注       |
| -------- | ------ | -------- |
| user_id       | 用户ID   |          |
| cart_id       | 购物车ID   |          |
| created_at       | 创建时间   |          |
| updated_at       |   更新时间 |          |

#### 1.3.2.3. 同步购物车
- 请求路径：https://api-hmugo-web.itheima.net/api/public/v1/my/cart/sync
- 请求方法：post
- 请求参数

| 参数名   | 参数说明             | 备注   |
| -------- | -------------------- | ------ |
| infos    | 商品对象集合字符串   |        |

- 请求数据
```javascript
{
	{
    "infos": "商品对象集合字符串"
	}
}
```
- 响应参数

| 参数名      | 参数说明   | 备注       |
| -------- | ------ | -------- |
| user_id       | 用户ID   |          |
| cart_id       | 购物车ID   |          |
| created_at       | 创建时间   |          |
| updated_at       |   更新时间 |          |

### 1.3.3. 订单API
#### 1.3.3.1. 创建订单
- 请求路径：https://api-hmugo-web.itheima.net/api/public/v1/my/orders/create
- 请求方法：post

- 请求参数

| 参数名         | 参数说明 | 备注   |
| -------------- | -------- | ------ |
| order_price    | 订单价格 |        |
| consignee_addr | 订单地址 |        |
| goods   | 商品列表内部存放商品（ID，amount和goods_price）列表 |       |

- 请求数据
```javascript
{
	"order_price":5,
	"consignee_addr":"地址",
	"goods":[
		{
			"goods_id":5,
			"goods_number":3,
			"goods_price":15
		}
	]
}
```

- 响应参数

| 参数名      | 参数说明   | 备注       |
| -------- | ------ | -------- |
| order_id       | 订单唯一ID   |          |
| user_id       | 用户ID   |          |
| order_number       | 订单编号   |          |
| order_price       | 订单价格   |          |
| order_pay       | 订单支付方式   |          |
| consignee_addr       | 订单地址   |          |
| pay_status       | 订单支付状态   |          |

#### 1.3.3.2. 订单查询
- 请求路径：https://api-hmugo-web.itheima.net/api/public/v1/my/orders/all
- 请求方法：get

- 请求参数

| 参数名      | 参数说明 | 备注   |
| ----------- | -------- | ------ |
| type        | 1,2,3    | 1:全部订单 2:待付款 3:待发货       |


- 响应参数

| 参数名      | 参数说明   | 备注       |
| -------- | ------ | -------- |
| order_id       | 订单唯一ID   |          |
| user_id       | 用户ID   |          |
| order_number       | 订单编号   |          |
| order_price       | 订单价格   |          |
| order_pay       | 订单支付方式   |          |
| consignee_addr       | 订单地址   |          |
| pay_status       | 订单支付状态   |          |
