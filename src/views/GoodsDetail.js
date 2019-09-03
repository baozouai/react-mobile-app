import React, { Component } from 'react'
import { Carousel } from 'antd-mobile'
import { getGoogdDetail } from '../api';
import { NavBar, Icon, Badge, SegmentedControl, WingBlank, WhiteSpace, Toast } from 'antd-mobile';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import {addCart, getCartGoods} from '../api/index'
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
    componentWillMount() {
        // 一开始设置等待
        this.setState({ animating: true })
        getGoogdDetail(this.state.id).then(res => {
            const { meta: { status }, message } = res.data
            const {
                pics,
                goods_name,
                goods_price,
                add_time,
                goods_number,
                goods_introduce,
                attrs } = message
            // 获取数据成功
            if (status === 200) {
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
        let info = {}
        info.cat_id = this.state.message.cat_id
        info.goods_id = this.state.message.goods_id
        info.goods_name = this.state.message.goods_name
        info.goods_number = this.state.message.goods_number
        info.goods_price = this.state.message.goods_price
        info.goods_small_logo = this.state.message.goods_small_logo
        info.goods_weight = this.state.message.goods_weight        
        addCart({info: JSON.stringify(info)}).then(res => {
            const {meta: {status}} = res.data
            if (status === 200) {
                // 商品数量+1，改变cartReducer中的商品总数
                this.props.addCart()
            }
            getCartGoods()
        })
        Toast.success('添加成功，在购物车等亲', 2)
    }
    // 跳转到购物车
    jumpCart = () => {
        this.props.history.push('/my/cart')
    }
    // 立即购买
    jumpCart = () => {
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
                    style={{
                        position: 'fixed',
                        width: '100%',
                        left: 0,
                        top: 0,
                        right: 0,
                        zIndex: 1000
                    }}
                >商品详情</NavBar>
                {/* 轮播图区域 */}
                <Carousel
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


                <WingBlank size="lg" className="sc-example">
                    <div className="good-select">
                        <ul>
                            <li>
                                <span>上架时间</span>
                                <span>{new Date(parseInt(this.state.add_time) * 1000).toLocaleString().replace(/\//g, '-').slice(0, 9)}</span>
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
                    <div className="goods-footer-item contact">
                        <span className="iconfont iconkefu1"></span>
                        <span>联系客服</span>
                    </div>
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
                    <div className="goods-footer-item buy" onClick={this.jumpCart}>
                        <span>立即购买</span>
                    </div>
                </div>
                <style jsx>{`
                .sc-example {
                    margin: 13px 0;
                    }
                    .good-content {
                        padding: 10px;
                        .good-describe {
                            font-size: 15px;
                        }
                        .good-price {
                            margin-top: 10px;
                            color: red;
                            font-size: 20px;
                            font-weight: bold;
                            span {
                                font-size: 12px;
                                
                            }
                        }
                    }
                    .good-select {
                        li {
                            display: flex;
                            padding: 10px;
                            font-size: 14px;
                            border-bottom: 1px solid #333;
                            span:nth-of-type(1) {
                                color: #ccc;
                                flex: 1;
                            }
                            span:nth-of-type(2) {
                                flex: 4;
                            }
                        }
                    }
                    .good-param {
                        background-color: #eee;
                        div {
                            padding: 10px;
                        }
                        div:nth-of-type(1) {
                            font-weight: bold;
                            border-bottom: 1px solid #333;
                        }
                        div:nth-of-type(2) {
                            font-size: 14px;
                            display: flex;
                            span:nth-of-type(1) {
                                flex: 1;
                            }
                            span:nth-of-type(2) {
                                flex: 2;
                            }
                        }
                    }
                    .goods-footer {
                        display: flex;
                        position: fixed;
                        bottom: 0;
                        left: 0;
                        height: 50px;
                        width: 100%;
                        border-top: 1px solid #e7e7e7;
                        background-color: #fff;

                        .goods-footer-item {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        }

                        .contact,
                        .cart {
                        width: 40%;
                        font-size: 12px;
                        position: relative;
                        }

                        .badge {
                        position: absolute;
                        top: 3%;
                        left: 50%;
                        padding: 2px 5px;
                        border-radius: 100%;
                        background-color: #e4393c;
                        text-align: center;

                        color: white;
                        }

                        .add,
                        .buy {
                        width: 60%;
                        color: white;

                        &>span {
                            font-size: 20px;
                        }
                        }

                        .add {
                        background-color: #ff976a;
                        }

                        .buy {
                        background-color: #ff4444;
                        }
  }
            `}</style>
            </div>

        )
    }
}

// 创建映射状态函数
const mapStateToProps = state => {
    return {
        totalNum: state.CartModule.totalNum
    }   
}

// 创建映射dispatch函数
const mapDispatchToProps = dispatch => {
    return {
        addCart: () => {
            dispatch({type: 'ADD_CART'})
        },
        buyNow: (selectedGoodsTotalNum, totalPrice) => {
            console.log(totalPrice);
            dispatch({type: 'BUY_NOW', payload: {selectedGoodsTotalNum, totalPrice}})
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(GoodsDetail))
