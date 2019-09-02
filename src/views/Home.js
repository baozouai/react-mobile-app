import React, { Component } from 'react'

import {withRouter} from 'react-router-dom'
import { Carousel, Flex, WingBlank, WhiteSpace, SearchBar, ActivityIndicator, Button } from 'antd-mobile';
import { getHomeCarousel, getHomeGoodslist } from '../api/index'
import qs from 'querystring'
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
            placeholderPre: '',
            animating: false
        }
    }
    componentWillUnmount() {

      }
      
    // 在render之前获取数据
    componentWillMount() {
        // 一开始设置等待
        this.setState({animating: true})

        // 获取轮播图数据
        getHomeCarousel().then(res => {
            // 解构赋值
            const { message, meta: { status } } = res.data
            // 状态码为200的时候
            if (status === 200) {
                // console.log(message)
                // 将获取到的轮播图数据复制给carouselList
                this.setState({
                    carouselList: message
                })
            }
        })
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
                const index = Math.floor((Math.random()* 16))
                // 计算行和列
                const i = Math.floor(index / 4)
                const j = index % 4
                 // 搜索框预设初值
                this.setState({
                    placeholderPre: message[i].goods[j].goods_name.slice(0, 10) + '...'
                })
               
                
            }
            
        }).then(() => {
            this.setState({
                bottom: true
            })
        })
        
    }

    // 页面加载完后
    componentDidMount() {


    }
    // 找相似
    handleSearchSimilar = (cid) => {
        this.props.history.push('/searchgoods/' + qs.stringify({cid}))
    }
    render() {
        return (
            // 轮播图区域
            <div>
                <ActivityIndicator
                toast
                text="拼命加载啊..."
                animating={this.state.animating}
              />
                <SearchBar placeholder={this.state.placeholderPre}
                    onFocus={() => this.props.history.push('/searchfield')}
                    style={{position:'fixed', top: 0, left: 0, width: '100%'}}
                    />
                
                <Carousel
                    autoplay={true}
                    infinite
                    style={{marginTop: 44}}
                >
                    {this.state.carouselList.map(val => (
                        <img key={val.goods_id}
                            src={val.image_src}
                            alt=""
                            style={{ width: '100%', verticalAlign: 'top',imgHeight: this.state.imgHeight }}
                        />
                    ))}
                </Carousel>
                <div className="pyg_catitems">
                    <div><img src="https://www.zhengzhicheng.cn/pyg/icon_index_nav_3@2x.png" alt=""/></div>

                    <div><img src="https://www.zhengzhicheng.cn/pyg/icon_index_nav_2@2x.png" alt=""/></div>

                    <div><img src="https://www.zhengzhicheng.cn/pyg/icon_index_nav_1@2x.png" alt=""/></div>

                    <div><img src="https://www.zhengzhicheng.cn/pyg/icon_index_nav_5@2x.png" alt=""/></div>
                </div>
                {/* 首页商品列表区域 */}
                <div className="pyg_goodsList">
                    {this.state.goodsList.map(item => (
                        <div key={item.group_img} className="pyg_goods">
                            {/* WhiteSpace：上下留白 size表示留白的程度 */}
                            <WhiteSpace size="sm" />
                            <img src={item.group_img}
                            // 图片加载完取消等待
                                onLoad={() => {
                                    this.setState({animating: false})
                                  }}
                            alt="" />
                                {/* WingBlank：左右留白 size表示留白的程度 */}
                                <WingBlank size="sm">
                                <Flex 
                                justify="between"
                                wrap="wrap"
                                >
                                {item.goods.map(v => (
                                    <div key={v.goods_id} className="pyg_good">
                                        <div className="good_content"
                                        onClick={() => this.props.history.push(`/goodsdetail/${v.goods_id}`)}
                                        >
                                            <img src={v.goods_small_logo}
                                                alt="" />
                                            <div className="pyg_describe ellipsis-1">{v.goods_name}</div>
                                            <div className="pyg_price">&yen;{v.goods_price}</div>
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
                {this.state.bottom ? <div className="goods-list-bottom">
                    <div className="line">
                        <span>我是有底线的~  </span> 
                    </div>
                   
                    </div> : ''}
                {/* 商品列表的CSS样式 */}
                <style jsx>{`
                .search-similar {
                    border: 1px solid rgb(16, 142, 233);
                    width: 55%;
                    display: block;
                    margin: 10px auto;
                    background-color: #fff;
                    padding: 5px 10px;
                    border-radius: 5px;
                    color: rgb(16, 142, 233);
                }
                .goods-list-bottom {
                    height: 40px;
                    line-height: 40px;
                    text-align: center;
                    font-size: 14px;
                    color: #ccc;
                    display: flex;
                    position: relative;
                    align-items: center;
                    .line {
                        width: 300px;
                        height: 1px;
                        vertical-align: middle;
                        background-color: #ccc;
                        margin: 0 auto;
                        text-align: center;
                        span {
                            background-color: #f5f5f9;
                            padding: 0 20px;
                            position: absolute;
                            top: -50%;
                            transform: translate(-50%, 50%);
                        }
                    }
                }
                .ellipsis-1 {
                    overflow: hidden; 
                    text-overflow: ellipsis; 
                    white-space: nowrap;
                }

                .pyg_catitems {
                    display: flex;
                    background-color: #fff;
                    padding: 10px;

                    div {
                        flex: 1;
                        text-align: center;

                        img {
                            margin: 0 auto;
                            width: 50%;
                        }
                    }
                }
                
                .pyg_goodsList {
                    .pyg_goods {

                        >img {
                            display: block;
                        }
                        
                        .pyg_good {
                            width: 49.5%;
                            border-radius: 20px;
                            padding: 10px;
                            margin-top: 6px;
                            background-color: #fff;

                            .good_content {
                                
                                img {
                                    
                                    width: 60%;
                                    margin: 0 auto;
                                    display: block;
                                }

                                .pyg_describe {
                                    font-size: 13px;
                                    color: #333;
                                    padding: 10px 5px;
                                }

                                .pyg_price {
                                    font-size: 13px;
                                    color: red;
                                }
                            }

                            .pyg_similar {
                                width: 80%;
                                display: block;
                                margin: 5px auto 0;
                            }

                        }
                        
                    }
                }
                `}</style>
            </div>
        )
    }
}

export default withRouter(Home)
