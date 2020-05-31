import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Carousel, Flex, WingBlank, WhiteSpace, SearchBar } from 'antd-mobile';
import { getHomeGoodslist } from '../api/index'
import qs from 'querystring'
import '../style/home.css'
import banner1 from '../upload/banner1.png'
import banner2 from '../upload/banner2.png'
import banner3 from '../upload/banner3.png'

import { baseUrl } from '../api/index';

export class Home extends Component {
    constructor(props) {
        super(props)

        this.state = {

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
        // 获取商品列表数据
        getHomeGoodslist().then(res => {
            // 解构赋值
            const { message, meta: { status } } = res.data
            // 状态码为200的时候
            if (status === 200) {
                //  首页商品是16 => 4 * 4个，随机获取0~15索引值
                const index = Math.floor((Math.random() * 16))
                // 计算行和列
                const i = Math.floor(index / 4)
                const j = index % 4

                this.setState({
                    // 将获取到的商品列表数据赋值给goodsList
                    goodsList: message,
                    // 搜索框预设初值
                    placeholderPre: message[i].goods[j].goods_name.slice(0, 10) + '...',
                    // 获取商品列表后显示底部文字
                    bottom: true
                })
            }
        })
    }
    // 找相似
    handleSearchSimilar = cid => {
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
                        className="search-area"
                    /> : ''}
                {/* 轮播图 */}
                <Carousel
                    autoplay={true}
                    infinite
                    style={{ marginTop: 44 }}
                >
                    <img src={banner1} alt="" />
                    <img src={banner2} alt="" />
                    <img src={banner3} alt="" />
                </Carousel>
                {/* 分类 */}
                <div className="catitems">
                    <div onClick={() => this.props.history.push('/searchgoods/query=秒杀')}><img src={`${baseUrl}/pyg/icon_index_nav_4@2x.png`} alt="" /></div>

                    <div onClick={() => this.props.history.push('/searchgoods/query=超市')}><img src={`${baseUrl}/pyg/icon_index_nav_2@2x.png`} alt="" /></div>

                    <div onClick={() => this.props.history.push('/searchgoods/query=母婴')}><img src={`${baseUrl}/pyg/icon_index_nav_1@2x.png`} alt="" /></div>

                    <div onClick={() => this.props.history.push('/searchgoods/query=充值')}><img src={`${baseUrl}/pyg/icon_index_nav_5@2x.png`} alt="" /></div>
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
