import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import ReactDOM from 'react-dom'
import { SearchBar, WingBlank, Flex, ActivityIndicator, PullToRefresh, Toast } from 'antd-mobile'
import { searchGoods } from '../api/index'
import qs from 'querystring'
export class SearchGoods extends Component {
    constructor(props) {
        super(props)

        this.state = {
            goodsList: [],
            bottom: false,
            animating: false,
            refreshing: false,
            down: false,
            height: document.documentElement.clientHeight,
            pagenum: 2,
        }
    }
    UNSAFE_componentWillMount() {
        // 一开始设置等待
        this.setState({ animating: true })
        // 获取搜索值
        var searchValue = this.props.match.params.goodsvalue
        
        // // 商品商品
        searchGoods(searchValue).then(res => {
            // 解构赋值
            const { meta: { status }, message: { goods, total } } = res.data
            if (status === 200) {
                // 如果获取到的数据为空，则弹框提示
                if (total === 0) {
                    this.setState({
                        animating: false,
                        refreshing: false,
                        bottom: true
                    })
                     // 2秒后跳转回首页
                    Toast.info('没有这类商品，正在跳转回首页...', 2, () => this.props.history.push('/'))
                   
                }
                this.setState({
                    goodsList: goods
                })
            }
            if (goods.length < 20) {
                this.setState({
                    bottom: true
                })
            }
        })
    }
    UNSAFE_componentDidMount() {
        const height = this.state.height - ReactDOM.findDOMNode(this.ptr).offsetTop;
        this.setState({
            height
        })
    }
    getMoreGoods = () => {
        // 获取搜索值
        const query = this.props.match.params.goodsvalue
        const pagenum = this.state.pagenum
        const searchData = qs.stringify({ query, pagenum })
        searchGoods(searchData).then(res => {
            console.log(res)
            // 解构赋值
            const { meta: { status }, message: { goods } } = res.data
            if (status === 200) {
                if (!goods.length) {

                    this.setState({
                        refreshing: false,
                    })
                }
                if (goods.length !== 20) {
                    this.setState({
                        bottom: true
                    })
                    Toast.info('没有更多数据了')
                }
                this.setState({
                    goodsList: this.state.goodsList.concat(goods)
                })
            }
        })
        this.setState({
            pagenum: this.state.pagenum + 1
        })
    }
    render() {
        return (
            <div>
                <ActivityIndicator
                    toast
                    text="拼命加载啊..."
                    animating={this.state.animating}
                />
                <div style={{display: 'flex',backgroundColor: '#efeff4'}}>
                    <i className="iconfont icon-arrow-left" 
                    style={{width: 30, alignSelf: 'center',  padding: '0 10px'}}
                    onClick={() => this.props.history.goBack()}
                    ></i>
                    <SearchBar placeholder="搜索你感兴趣的商品"
                    onFocus={() => this.props.history.push('/searchfield')}
                    placeholder="搜索你感兴趣的商品"
                    style={{flex: 1}}
                    onCancel={v => this.handleSearch(v)}
                    onSubmit={v => this.handleSearch(v)}
                    ref={ref => this.autoFocusInst = ref}
                    cancelText="搜索"
                    onChange={v => {
                        // 中文输入法下输入时会出现先英文，如n'i'h'a'o => 你好，中间会有'的标点，
                        // 通过判断是否带有此符号来判断是否继续获取搜索建议
                        if (v.indexOf("'") === -1) {
                            console.log(v)
                            this.handleSearchSuggest(v)
                        }
                    }}
                />
                </div>

                
                <PullToRefresh
                    damping={60}
                    ref={el => this.ptr = el}
                    style={{
                        height: this.state.height,
                        overflow: 'auto',
                    }}
                    indicator={this.state.down ? {} : { deactivate: '上拉可以刷新' }}
                    direction={this.state.down ? 'down' : 'up'}
                    refreshing={this.state.refreshing}
                    onRefresh={() => {
                        this.setState({ refreshing: true });
                        this.getMoreGoods()
                    }}
                >
                    {/* WingBlank：左右留白 size表示留白的程度 */}
                    <WingBlank size="middle">
                        <Flex
                            justify="between"
                            wrap="wrap"
                        >
                            {this.state.goodsList.map(v => (
                                v.goods_small_logo ?
                                    <div key={v.goods_id} className="pyg_good" onClick={() => this.props.history.push(`/goodsdetail/${v.goods_id}`)}>
                                        <div className="good_content">
                                            <img src={v.goods_small_logo}
                                                // 图片加载完取消等待
                                                onLoad={() => {
                                                    this.setState({
                                                        animating: false,
                                                        refreshing: false
                                                    })

                                                }}
                                                alt="" />
                                            <div className="pyg_describe ellipsis-1">{v.goods_name}</div>
                                            <div className="pyg_price">&yen;{v.goods_price}</div>
                                        </div>
                                    </div> : ''
                            ))}

                        </Flex>
                    </WingBlank>
                    {this.state.bottom ?
                        <div className="goods-list-bottom">
                            <div className="line">
                                <span>没有更多数据了 </span>
                            </div>
                        </div> : ''
                    }
                </PullToRefresh>

                <style jsx>{`
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
                        width: 200px;
                        height: 1px;
                        vertical-align: middle;
                        background-color: #ccc;
                        margin: 0 auto;
                        text-align: center;
                    span {
                        background-color: #f5f5f9;
                        padding: 0 10px;
                        position: absolute;
                        top: -50%;
                        font-size: 10px;
                        transform: translate(-50%, 50%);
                    }
                    }
            }
            .ellipsis-1 {
                overflow: hidden; 
                text-overflow: ellipsis; 
                white-space: nowrap; 
                
            }
            .goods-list-bottom {
                text-align: center;
                height: 50px;
                line-height: 50px;
                font-size: 16px;
            }
            .pyg_good {
                    width: 49.5%;
                    border-radius: 20px;
                    padding: 10px;
                    margin-top: 6px;
                    background-color: #fff;

                    .good_content {
                        img {
                            margin: 0 auto;
                            width: 70%;
                            display: block;
                        }

                        .pyg_describe {
                            padding: 10px 5px;
                            font-size: 13px;
                            color: #333;
                            
                        }

                        .pyg_price {
                            font-size: 16px;
                            color: red;
                        }
                    }

                    .pyg_similar {
                        width: 80%;
                        display: block;
                        margin: 5px auto 0;
                    }

            }
            .goods-lists {
                
                li {
                    background-color: #fff;
                    border-radius: 10px;
                    a {
                        
                        padding: 10px;
                        width: 100%;
                        height: auto;
                        justify-content: space-between;
                        display: flex;

                        img {

                            width: 40%;
                            display: block;
                        }
                        .good-content { 
                            flex: 1;
                            margin: 30px;
                            // padding-top: 30px;
                            .good-describe {
                                color: #333;
                            }
                            .good-price {
                                margin-top: 30px;
                                color: red;
                                font-weight: bold;
                                span {
                                    font-size: 12px;
                                }
                            }
                        }
                        @media screen and (max-width: 500px) {
                            img {
                                width: 50%;
                                height: 50%;
                                display: block;
                            }
                            .good-content { 
                                margin: 0;
                                padding-top: 20px;
                            }
                        }
                        
                    }
                }
            }    
            `}</style>
            </div>
        )
    }
}

export default withRouter(SearchGoods)
