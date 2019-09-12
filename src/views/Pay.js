import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { NavBar, Icon, Toast } from 'antd-mobile'
import {connect} from 'react-redux'
import {createOrder, syncCart, getGoogdDetail, getCartGoods} from '../api/index'
export class Pay extends Component {
    constructor(props) {
        super(props)

        this.state = {
            cart_infos_Array: [],
            id: ''
        }
    }
    UNSAFE_componentWillMount() {
        // render之前获取页面是否有id 如果是购物车跳转过来的话没有id，Number之后的NaN
        var id = Number(this.props.location.pathname.split('/').pop())
        if (id) {
            this.setState({
                id
            })
            getGoogdDetail(id).then(res => {
                res.data.message.selectedStatus = true
                this.setState({
                    cart_infos_Array: [res.data.message]
                })
                console.log(this.state.cart_infos_Array);
            })
        } else if (this.props.cart_Infos) {
                this.setState({
                    cart_infos_Array: Object.values(this.props.cart_Infos)
                })
            }
        }
       
    
    // 提交订单
    submitOrder = () => {
        
        // 初始化goods数组
        let goods = []
        var cart_infos
        //因为有可能从商品详情的立即购买跳转过来，也可能从购物车的结算跳转过来，所以分两条路径判断
        // 从商品详情的立即购买跳转过来location带有参数，购物车没有
        if (!this.state.id) {
            cart_infos = this.props.cart_Infos
            this.state.cart_infos_Array.forEach(v => {
                // 商品选中就将id，数量，价格存入goods数组中
                if (v.selectedStatus) {
                    goods.push({
                        goods_id: v.goods_id,
                        goods_number: v.amount,
                        goods_price: v.goods_price,
                    })
                    // 同时将订单中选择的商品删除
                    delete cart_infos[v.goods_id]
                }
            })
        } else {
            // 如果从商品详情的立即购买跳转过来，要拿到购物车的数据，否则提交订单的时候购物车还没结算的数据会丢失
            getCartGoods().then(res => {
                // 将数据解构处理
                const { meta: { status }, message: { cart_info } } = res.data
                // 状态码200表示获取购物车数据成功
                if (status === 200) {
                    cart_infos = JSON.parse(cart_info)
                }
            })
            goods = [{
                goods_id:this.state.cart_infos_Array[0].goods_id,
                goods_number:1,
                goods_price:this.state.cart_infos_Array[0].goods_price
            }]
        }
        // 创建订单
        createOrder({order_price: this.props.totalPrice, consignee_addr: this.props.address, goods}).then(res => {
            const {meta: {msg, status}} = res.data
            if (status === 200) {
                Toast.success(msg, 2, () => {
                    this.props.history.push('/order')
                })
                // 提交订单后同步购物车 cart_infos中的数据是未被提交的订单
                syncCart({ infos: JSON.stringify(cart_infos) }).then(res=>{
                    console.log(res);
                })
            }
        })
    }
    
    render() {
        return (
            <div>
                {/* 顶部导航条 */}
                <NavBar
                    mode="dark"
                    leftContent={<Icon type='left' />}
                    onLeftClick={() => this.props.history.goBack()}
                    style={{
                        position: 'fixed',
                        width: '100%',
                        left: 0,
                        top: 0,
                        right: 0,
                        zIndex: 1000
                    }}
                >确认订单</NavBar>
                <div style={{ margin: '60px 10px 0'}}>
                    <div className="default-address"
                    onClick={() => this.props.history.push('/address')}
                    >
                        <div className="left-icon">
                            <i className="iconfont icon-dingwei" ></i>
                        </div>
                        <div className="address-info">
                            <div className="address-info-top">
                                <span className="name">{this.props.name}</span>
                                <span className="phone">{this.props.phone}</span>
                            </div>
                            <div className="address-info-bottom">{this.props.address}</div>
                        </div>
                        <div className="right-icon">
                            <i className="iconfont icon-youjiantou" ></i>
                        </div>
                    </div>
                    <div className="order-list">
                        {this.state.cart_infos_Array?this.state.cart_infos_Array.map(v => (
                        v.selectedStatus?
                        <div key={v.goods_id} className="single-order">

                            <img src={v.goods_small_logo}
                                alt=""/>
                                <div className="order-content">
                                    <div className="order-title ellipsis-2">{v.goods_name}</div>

                                    <div className="order-price">
                                        <span>共{v.amount? v.amount: 1}件 </span>
                                        <span>小计：</span>
                                        <span>&yen;{v.amount?v.amount * v.goods_price: v.goods_price}.00</span>
                                    </div>
                                </div>
                        </div>: ''

                        ))
                            : ''
                        }
                        
                    </div>
                </div>
                <div className="submit-order-footer">
                <div className="submit-order-footer-left">
                        共{this.props.selectedGoodsTotalNum}件
                </div>
                <div className="submit-order-footer-center">
                  <span>合计：</span>
                  <span className="total-price"><span>￥</span> {this.props.totalPrice}</span>
                </div>
                <div className="submit-order-footer-right" onClick={this.submitOrder}>
                  <span className="submit-order">提交订单</span>
                </div>
              </div>
                    <style jsx>{`
                    .ellipsis-2 {
                        display: -webkit-box;
                        overflow: hidden;
                        white-space: normal!important;
                        text-overflow: ellipsis;
                        word-wrap: break-word;
                        -webkit-line-clamp: 2;
                        -webkit-box-orient: vertical;
                    }
                      .default-address {
                          height: 50px;
                          background-color: #fff;
                          border-radius: 10px;
                          display: flex;
                          align-items: center;

                        .left-icon, .right-icon {
                            flex:1;
                            i {
                                font-size: 26px;
                            }
                            
                        }
                        .left-icon {
                            padding-left: 10px;
                        }
                        .address-info {
                            flex: 8;
                            .address-info-top {

                            .name {
                                padding: 0 10px;
                            }
                            .phone {
                                color: #666;
                            }
                            }
                            .address-info-bottom {
                                margin-top: 5px;
                                font-size: 10px;
                                padding-left: 10px;
                                color: #666;
                            }
                        }
                      }
                      .single-order {
                            margin-top: 100px;
                            background-color: #fff;
                            padding: 5px;
                            display: flex;
                            align-items: center;
                            border-radius: 10px;
                            position: relative;
                            margin-top: 5px;
            
                            img {
                                width: 30%;
                                flex: 1;
                                padding: 10px;
                            }
            
                            .order-content {
                                flex: 4;
            
                                .order-title {
                                    position: absolute;
                                    top: 15px;
                                    padding-right: 5px;
            
                                }
            
            
                                .order-price {
                                    position: absolute;
                                    bottom: 15px;
                                    right: 10px;
                                    font-size: 12px;
                                    span:nth-of-type(1) {
                                        color: #ccc;
                                        margin-right: 1px;
                                    }
                                    span:nth-of-type(3) {
                                        color: red;
                                        margin-left: 1px;
                                    }
                                }
                            }
            
                        }
                        .submit-order-footer {
                            position: fixed;
                            bottom: 0px;
                            display: flex;
                            justify-content: space-between;
                            height: 50px;
                            line-height: 50px;
                            width: 100%;
                            border-top: 1px solid #e7e7e7;
                            background-color: #fff;
                            .submit-order-footer-left {
                               padding-left: 100px;
                               color: #999;
                                
                            }
                            .submit-order-footer-center {
                                .total-price {
                                color: #ff5500;
                                span {
                                    font-size: 10px;
                                }
                                }
                            }
                            .submit-order-footer-right {
                                display: flex;
                                height: 40px;
                                border-radius: 20px;
                                align-self: center;
                                line-height: 40px;
                                flex-direction: column;
                                padding: 0 20px;
                                margin-right: 5px;
                                background-color: #ff5500;
                                .submit-order {
                                color: #fff;
                                }
                            }
                            }
                 `}</style>
            </div>
                )
            }
        }
const mapStateToProps = (state) => {
    return {
        cart_Infos: state.CartModule.cart_Infos,
        totalPrice: state.CartModule.totalPrice,
        selectedGoodsTotalNum: state.CartModule.selectedGoodsTotalNum,
        name: state.userModule.name,
        phone: state.userModule.phone,
        address: state.userModule.address,
    }
}        
export default connect(mapStateToProps)(withRouter(Pay))
