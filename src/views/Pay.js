import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { NavBar, Icon, Toast } from 'antd-mobile'
import { connect } from 'react-redux'
import { createOrder, syncCart, getGoodsDetail, getCartGoods } from '../api/index'
import '../style/pay.css'
export class Pay extends Component {
    constructor(props) {
        super(props)

        this.state = {
            cart_infos_Array: [],

        }
    }
    UNSAFE_componentWillMount() {

        // render之前获取页面是否有id 如果是购物车跳转过来的话没有id，Number之后的NaN
        let id = Number(this.props.location.pathname.split('/').pop())
        let cart_infos_Array
        if (id) {
            this.setState({
                id
            })
            getGoodsDetail(id).then(res => {
                res.data.message.selectedStatus = true
                cart_infos_Array = [res.data.message]
                this.setState({
                    cart_infos_Array
                })
            })
        } else if (this.props.cart_Infos) {
            cart_infos_Array = Object.values(this.props.cart_Infos)
            this.setState({
                cart_infos_Array
            })
        }
    }
    // 提交订单
    submitOrder = () => {
        // 初始化goods数组
        let goods = []
        let cart_infos
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
                goods_id: this.state.cart_infos_Array[0].goods_id,
                goods_number: 1,
                goods_price: this.state.cart_infos_Array[0].goods_price
            }]
        }
        // 创建订单
        createOrder({ order_price: this.props.totalPrice, consignee_addr: this.props.address, goods }).then(res => {
            const { meta: { msg, status } } = res.data
            if (status === 200) {
                Toast.success(msg, 2, () => {
                    this.props.history.push('/order')
                })
                // 提交订单后同步购物车 cart_infos中的数据是未被提交的订单
                syncCart({ infos: JSON.stringify(cart_infos) })
                this.props.snycCartGoods(cart_infos)
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
                    className="nav-bar-style"
                >确认订单</NavBar>
                <div style={{ margin: '60px 10px 0' }}>
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
                        {this.state.cart_infos_Array ? this.state.cart_infos_Array.map(v => (
                            v.selectedStatus ?
                                <div key={v.goods_id} className="single-order">
                                    <img src={v.goods_small_logo} alt="" />
                                    <div className="order-content">
                                        <div className="order-title ellipsis-2">{v.goods_name}</div>
                                        <div className="order-price">
                                            <span>共{v.amount ? v.amount : 1}件 </span>
                                            <span>小计：</span>
                                            <span>&yen;{v.amount ? v.amount * v.goods_price : v.goods_price}.00</span>
                                        </div>
                                    </div>
                                </div> : ''
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
        address: state.userModule.address
    }
}

const mapActionToProps = (dispatch) => {
    return {
        // 同步购物车数据
        snycCartGoods: (cart_Infos) => {
            dispatch({ type: 'SYNC_CART_GOODS', payload: { cart_Infos } })
        }
    }
}
export default connect(mapStateToProps, mapActionToProps)(withRouter(Pay))
