import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { getGoodsDetail, addCart, getCartGoods } from '../api';
import { NavBar, Carousel, Icon, Badge, SegmentedControl, WingBlank, WhiteSpace, Toast } from 'antd-mobile';
import '../style/goodsdetail.css'
export class GoodsDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            message: {},
            id: this.props.match.params.id,
            carouselList: [{ pics_id: 1 }, { pics_id: 2 }],
            imgHeight: '',
            goods_name: '',
            goods_price: '',
            add_time: '',
            goods_number: '',
            goods_introduce: '',
            attrs: [],
            animating: false,
            display1: 'block',
            display2: 'none'
        }
    }
    // 页面加载后获取数据
    UNSAFE_componentWillMount() {
        // 一开始设置等待
        this.setState({ animating: true })
        // 获取商品详情
        getGoodsDetail(this.state.id).then(res => {
            const { meta: { status }, message } = res.data
            // 获取数据成功
            if (status === 200) {
                // 解构赋值
                const {
                    pics,
                    goods_name,
                    goods_price,
                    add_time,
                    goods_number,
                    goods_introduce,
                    attrs } = message
                // 将获取到的轮播图数据复制给carouselList
                this.setState({
                    carouselList: pics,
                    goods_name,
                    goods_price,
                    add_time,
                    goods_number,
                    goods_introduce,
                    attrs,
                    message
                })
            }
        })
    }
    // 添加商品到购物车
    addGoodsToCart = () => {
        // 如果已登录，则直接添加到购物车
        if (this.props.loginState) {
            let info = {}
            info.cat_id = this.state.message.cat_id
            info.goods_id = this.state.message.goods_id
            info.goods_name = this.state.message.goods_name
            info.goods_number = this.state.message.goods_number
            info.goods_price = this.state.message.goods_price
            info.goods_small_logo = this.state.message.goods_small_logo
            info.goods_weight = this.state.message.goods_weight
            addCart({ info: JSON.stringify(info) }).then(res => {
                const { meta: { status } } = res.data
                if (status === 200) {
                    // 商品数量+1，改变cartReducer中的商品总数
                    this.props.addCart()
                }
                // 同步购物车
                getCartGoods()
            })
            Toast.success('添加成功，在购物车等亲', 2)
        } else {
            Toast.fail('您还没登录，请先登录', 2, () => {
                this.props.history.push('/login')
            })
        }
    }
    // 跳转到购物车
    jumpCart = () => {
        this.props.history.push('/my/cart')
    }
    // 立即购买
    buyNow = () => {
        // 如果已登录，则跳转到支付页面
        // 立即购买的话设置商品总数量为1，价格为单价
        this.props.buyNow(1, this.state.message.goods_price)
        this.props.history.push(`/pay/${this.state.message.goods_id}`)
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
                >商品详情</NavBar>
                {/* 轮播图区域 */}
                <Carousel
                    // 自动轮播
                    autoplay={true}
                    infinite
                    style={{
                        marginTop: 45
                    }}
                >
                    {this.state.carouselList.map(val => (
                        <img key={val.pics_id}
                            src={val.pics_mid}
                            alt=""
                            style={{ width: '100%', verticalAlign: 'top' }}
                            // 图片加载完取消等待
                            onLoad={() => {
                                this.setState({ animating: false })
                            }}
                        />
                    ))}
                </Carousel>
                <div className="good-content">
                    <div className="good-describe">{this.state.goods_name}</div>
                    <div className="good-price"><span>&yen;</span>{this.state.goods_price}</div>
                </div>
                <WingBlank size="lg" className="good-wrap">
                    <div className="good-select">
                        <ul>
                            <li>
                                <span>上架时间</span>
                                <span>{new Date(parseInt(this.state.add_time) * 1000).toLocaleString().replace(/\//g, '-').slice(0, 9).replace('8', '9')}</span>
                            </li>
                            <li>
                                <span>库存</span>
                                <span>{this.state.goods_number}</span>
                            </li>
                            <li>
                                <span>促销</span>
                                <span>是</span>
                            </li>
                            <li>
                                <span>运费</span>
                                <span>免运费</span>
                            </li>
                        </ul>
                    </div>
                    <WhiteSpace />
                    {/* 分段器 */}
                    <SegmentedControl
                        values={['图文详情', '规格参数']}
                        onValueChange={v => {
                            // 根据分段器后的值，切换图文详情和规格参数
                            v === '图文详情' ? this.setState({
                                display1: 'block',
                                display2: 'none'
                            }) : this.setState({
                                display1: 'none',
                                display2: 'block'
                            })
                        }}
                    />
                    <WhiteSpace />
                </WingBlank>
                {/* 图文详情 */}
                <div style={{ display: this.state.display1 }} className="goods_info" dangerouslySetInnerHTML={{ __html: this.state.goods_introduce }}>
                </div>
                {/* 规格参数 */}
                <div style={{ display: this.state.display2 }}>
                    {this.state.attrs.map(v => (
                        <div key={v.attr_id} className="good-param">
                            <div>{v.attr_name.split('-')[0]}</div>
                            <div>
                                <span>{v.attr_name.split('-')[1]}</span>
                                <span>{v.attr_vals}</span>
                            </div>
                        </div>
                    ))}
                </div>
                <WhiteSpace size="lg" />
                <WhiteSpace size="lg" />
                <WhiteSpace size="lg" />
                <WhiteSpace size="lg" />
                {/* 页面底部加入购物车 */}
                <div className="goods-footer">
                    <div className="goods-footer-item cart" onClick={() => this.props.history.push('/cart')}>
                        <span className="iconfont icongouwuche1">
                            <Badge
                                text={this.props.totalNum}
                                overflowCount={50}
                                style={{
                                    position: 'absolute',
                                    width: 'auto',
                                    height: 'auto',
                                    top: '-20px',
                                    right: '-18px',
                                    fontSize: 8,
                                    borderRadius: '50%',
                                    backgroundColor: '#e4393c',
                                    textAlign: 'center',
                                    color: 'white'
                                }}>
                            </Badge>
                        </span>
                    </div>
                    <div className="goods-footer-item add" onClick={this.addGoodsToCart}>
                        <span>加入购物车</span>
                    </div>
                    <div className="goods-footer-item buy" onClick={this.buyNow}>
                        <span>立即购买</span>
                    </div>
                </div>
               
            </div>

        )
    }
}

// 创建映射状态函数
const mapStateToProps = state => {
    return {
        totalNum: state.CartModule.totalNum,
        loginState: state.userModule.loginState
    }
}

// 创建映射dispatch函数
const mapDispatchToProps = dispatch => {
    return {
        addCart: () => {
            dispatch({ type: 'ADD_CART' })
        },
        buyNow: (selectedGoodsTotalNum, totalPrice) => {
            dispatch({ type: 'BUY_NOW', payload: { selectedGoodsTotalNum, totalPrice } })
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(GoodsDetail))
