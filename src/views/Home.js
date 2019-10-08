import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Carousel, Flex, WingBlank, WhiteSpace, SearchBar } from 'antd-mobile';
import { getHomeCarousel, getHomeGoodslist } from '../api/index'
import qs from 'querystring'
import '../style/home.css'
export class Home extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // Carousel这个组件必须在初始化的时候就有一个长度>1的默认数组才能触发他的autoplay自动轮播属性。
            carouselList: [{ goods_id: 1 }, { goods_id: 2 }],
            imgHeight: '',
            // 商品列表
            goodsList: [],
            // 底部文字是否显示
            bottom: false,
            // 搜索框预设初值
            placeholderPre: ''
        }
    }
    // 在render之前获取数据
    UNSAFE_componentWillMount() {
        if (sessionStorage.getItem('carousel')) {
            this.setState({
                carouselList: JSON.parse(sessionStorage.getItem('carousel'))
            })
        } else {
            // 获取轮播图数据
            getHomeCarousel().then(res => {
                // 解构赋值
                const { message, meta: { status } } = res.data
                // 状态码为200的时候
                if (status === 200) {
                    // 将获取到的轮播图数据复制给carouselList
                    this.setState({
                        carouselList: message
                    })
                    sessionStorage.setItem('carousel', JSON.stringify(message))
                }
            })
        }
        // 获取商品列表数据
        getHomeGoodslist().then(res => {
            // 解构赋值
            const { message, meta: { status } } = res.data
            // 状态码为200的时候
            if (status === 200) {
                // 将获取到的商品列表数据赋值给goodsList
                this.setState({
                    goodsList: message
                })
                //  首页商品是16 => 4 * 4个，随机获取0~15索引值
                const index = Math.floor((Math.random() * 16))
                // 计算行和列
                const i = Math.floor(index / 4)
                const j = index % 4
                // 搜索框预设初值
                this.setState({
                    placeholderPre: message[i].goods[j].goods_name.slice(0, 10) + '...'
                })
            }
        }).then(() => {
            // 获取商品列表后显示底部文字
            this.setState({
                bottom: true
            })
        })
    }
    // 找相似
    handleSearchSimilar = (cid) => {
        this.props.history.push('/searchgoods/' + qs.stringify({ cid }))
    }
    render() {
        return (
            // 轮播图区域
            <div>
                {/* 搜索栏 */}
                {this.props.location.pathname === '/' ?
                <SearchBar placeholder={this.state.placeholderPre}
                    onFocus={() => this.props.history.push('/searchfield')}
                    style={{ position: 'fixed', top: 0, left: 0, width: '100%' }}
                /> : ''}
                {/* 轮播图 */}
                <Carousel
                    autoplay={true}
                    infinite
                    style={{ marginTop: 44 }}
                >
                    {this.state.carouselList.map(val => (
                        <img key={val.goods_id}
                            src={val.image_src}
                            alt=""
                            style={{ width: '100%', verticalAlign: 'top', imgHeight: this.state.imgHeight }}
                        />
                    ))}
                </Carousel>
                {/* 分类 */}
                <div className="catitems">
                    <div onClick={() => this.props.history.push('/searchgoods/query=秒杀')}><img src="https://www.zhengzhicheng.cn/pyg/icon_index_nav_3@2x.png" alt="" /></div>

                    <div onClick={() => this.props.history.push('/searchgoods/query=超市')}><img src="https://www.zhengzhicheng.cn/pyg/icon_index_nav_2@2x.png" alt="" /></div>

                    <div onClick={() => this.props.history.push('/searchgoods/query=母婴')}><img src="https://www.zhengzhicheng.cn/pyg/icon_index_nav_1@2x.png" alt="" /></div>

                    <div onClick={() => this.props.history.push('/searchgoods/query=充值')}><img src="https://www.zhengzhicheng.cn/pyg/icon_index_nav_5@2x.png" alt="" /></div>
                </div>
                {/* 首页商品列表区域 */}
                <div className="goodsList">
                    {this.state.goodsList.map(item => (
                        <div key={item.group_img} className="goods">
                            {/* WhiteSpace：上下留白 size表示留白的程度 */}
                            <WhiteSpace size="sm" />
                            <img src={item.group_img} alt="" />
                            {/* WingBlank：左右留白 size表示留白的程度 */}
                            <WingBlank size="sm">
                                {/* 采用flex布局 */}
                                <Flex
                                    justify="between"
                                    wrap="wrap"
                                >
                                    {item.goods.map(v => (
                                        <div key={v.goods_id} className="good">
                                            <div className="good_content"
                                                onClick={() => this.props.history.push(`/goodsdetail/${v.goods_id}`)}
                                            >
                                                <img src={v.goods_small_logo} alt="" />
                                                <div className="describe ellipsis-1">{v.goods_name}</div>
                                                <div className="price">&yen;{v.goods_price}</div>
                                            </div>
                                            <button
                                                className='search-similar'
                                                onClick={() => this.handleSearchSimilar(v.cat_id)}
                                            >
                                                找相似
                                            </button>
                                        </div>
                                    ))}
                                </Flex>
                            </WingBlank>
                        </div>
                    ))
                    }

                </div>
                {/* 根据bottom是否显示底部文字 */}
                {this.state.bottom ? <div className="goods-list-bottom">
                    <div className="line">
                        <span>我是有底线的~</span>
                    </div>

                </div> : ''}
                
            </div>
        )
    }
}

export default withRouter(Home)
