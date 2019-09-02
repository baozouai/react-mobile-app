import React, { Component } from 'react'
import { createForm } from 'rc-form';
import { NavBar, Icon, Toast } from 'antd-mobile'
import {connect} from 'react-redux'
import {createOrder, syncCart} from '../api/index'
export class Pay extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: '暴走',
            phone: '13999999999',
            address: '广东省广州市天河区xxx',
            cart_infos_Array: []
        }
    }
    componentWillMount() {
        this.setState({
            cart_infos_Array: Object.values(this.props.cart_Infos)
        })
    }
    submitOrder = () => {
        console.log(this.props.cart_Infos)
        // 创建订单
        // 初始化goods数组
        let goods = []
        let cart_infos = this.props.cart_Infos
        this.state.cart_infos_Array.forEach(v => {
            // 商品选中就将id，数量，价格存入goods数组中
            if (v.selectedStatus) {
                goods.push({
                    goods_id: v.goods_id,
                    goods_number: v.amount,
                    goods_price: v.goods_price,
                })
                delete cart_infos[v.goods_id]
            }
        })
        createOrder({order_price: this.props.totalPrice, consignee_addr: this.state.address}).then(res => {
            console.log(res);
            const {meta: {msg, status}} = res.data
            if (status === 200) {
                Toast.success(msg, 2)
                // 提交订单后同步购物车
                syncCart({ infos: JSON.stringify(cart_infos) })
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
                <div style={{ margin: '60px 10px'}}>
                    <div className="default-address">
                        <div className="left-icon">
                            <i className="iconfont icon-dingwei" ></i>
                        </div>
                        <div className="address-info">
                            <div className="address-info-top">
                                <span className="name">{this.state.name}</span>
                                <span className="phone">{this.state.phone}</span>
                            </div>
                            <div className="address-info-bottom">{this.state.address}</div>
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
                                        <span>共{v.amount}件 </span>
                                        <span>小计：</span>
                                        <span>&yen;{v.amount * v.goods_price}.00</span>
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
                            bottom: 50px;
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

    }
}        
export default connect(mapStateToProps)(Pay)
