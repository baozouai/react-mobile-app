import React, { Component } from 'react'
import { Tabs, NavBar, Icon, WingBlank, WhiteSpace } from 'antd-mobile';

import { getOrder } from '../api/index'
export class OrderList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            count: 0,
            orders: []
        }
    }
    componentWillMount() {
         // render之前获取页面是否有id 如果是提交订单后跳转过来的话没有id，Number之后的NaN
         var id = Number(this.props.location.pathname.split('/').pop())
         if (id) {
             this.setState({id})
         }
        // 获取订单
        getOrder().then(res => {
            console.log(res)
            const { meta: { status }, message: {count, orders} } = res.data
            this.setState({
                count,
                orders
            }, () => {
                console.log(this.state.count)
                console.log(this.state.orders)
            })
        })
        
    }
    convertTime = (create_time) => {
        var time =  new Date(parseInt(create_time) * 1000)
        var y = time.getFullYear(); //getFullYear方法以四位数字返回年份
        var M = time.getMonth() + 1; // getMonth方法从 Date 对象返回月份 (0 ~ 11)，返回结果需要手动加一
        var d = time.getDate(); // getDate方法从 Date 对象返回一个月中的某一天 (1 ~ 31)
        var h = time.getHours(); // getHours方法返回 Date 对象的小时 (0 ~ 23)
        var m = time.getMinutes(); // getMinutes方法返回 Date 对象的分钟 (0 ~ 59)
        var s = time.getSeconds(); // getSeconds方法返回 Date 对象的秒数 (0 ~ 59)
        return y + '-' + M + '-' + d + ' ' + h + ':' + m + ':' + s;
    }
    render() {
        const tabs = [
            { title: '全部订单' },
            { title: '待付款' },
            { title: '待发货' },
        ];
        return (
            <div>
                <NavBar
                    mode="dark"
                    leftContent={<Icon type='left' />}
                    onLeftClick={() => this.props.history.push('/my')}
                    style={{
                        position: 'fixed',
                        width: '100%',
                        left: 0,
                        top: 0,
                        right: 0,
                        zIndex: 1000
                    }}
                >我的订单{this.state.count? `(${this.state.count})`: ''}</NavBar>
                <Tabs tabs={tabs} initialPage={this.state.id?this.state.id: 0} animated={false} useOnPan={false}>
                
                <WingBlank style={{marginTop: 20, marginBottom: 60}}>

                    <div >
                        {this.state.orders.length? 
                            this.state.orders.map(v => (
                                v.goods.length?  
                                    <div key={v.order_id} className="single-order-list">
                                        {v.goods.map(v1 => (
                                            <div key={v1.goods_id} className="single-order">
                                                <img src={v1.goods_small_logo}
                                                    alt=""/>
                                                <div className="order-content">
                                                    <div className="order-title ellipsis-2">
                                                        { v1.goods_name }
                                                    </div>
                                                    <div className="num-price">
                                                        <span>￥{v1.goods_price}</span> X <span>{ v1.goods_number }</span>
                                                    </div>
                                                    <div className="order-price">
                                                        <span>共{ v1.goods_number }件</span>
                                                        <span>小计：</span>
                                                        <span>&yen;{ v1.goods_total_price }.00</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                        <div className="order-infos">
                                            <h4 className="title">订单信息</h4>
                                            <div className="order-infos-content">
                                                <div>
                                                    <span>订单编号：</span>
                                                    <span>{ v.order_number }</span>
                                                </div>
                                                <div>
                                                    <span>创建时间：</span>
                                                    <span>{ this.convertTime(v.create_time) }</span>
                                                </div>
                                                <div>
                                                    <span>地址：</span>
                                                    <span>{ v.consignee_addr }</span>
                                                </div>
                                                <div>
                                                    <span>发票抬头：</span>
                                                    <span>{ v.order_fapiao_title }</span>
                                                </div>
                                                <div>
                                                    <span>总件数：</span>
                                                    <span>{ v.total_count }</span>
                                                </div>
                                                <div>
                                                    <span>总价：</span>
                                                    <span className="total-price">￥{ v.total_price }.00</span>
                                                </div>
                                                <div>
                                                    <span>状态：</span>
                                                    <span>待付款</span>
                                                </div>
                                            </div>
                                        </div>

                            </div>
                                : ''
                            ))
                            : ''} 
                    </div>
                    </WingBlank>
                    <WingBlank style={{marginTop: 20, marginBottom: 60}}>

                    <div >
                        {this.state.orders.length? 
                            this.state.orders.map(v => (
                                v.goods.length?  
                                    <div key={v.order_id} className="single-order-list">
                                        {v.goods.map(v1 => (
                                            <div key={v1.goods_id} className="single-order">
                                                <img src={v1.goods_small_logo}
                                                    alt=""/>
                                                <div className="order-content">
                                                    <div className="order-title ellipsis-2">
                                                        { v1.goods_name }
                                                    </div>
                                                    <div className="order-price">
                                                        <span>共{ v1.goods_number }件</span>
                                                        <span>小计：</span>
                                                        <span>&yen;{ v1.goods_total_price }.00</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                        <div className="order-infos">
                                            <h4 className="title">订单信息</h4>
                                            <div className="order-infos-content">
                                                <div>
                                                    <span>订单编号：</span>
                                                    <span>{ v.order_number }</span>
                                                </div>
                                                <div>
                                                    <span>创建时间：</span>
                                                    <span></span>
                                                </div>
                                                <div>
                                                    <span>地址：</span>
                                                    <span>{ v.consignee_addr }</span>
                                                </div>
                                                <div>
                                                    <span>发票抬头：</span>
                                                    <span>{ v.order_fapiao_title }</span>
                                                </div>
                                                <div>
                                                    <span>总件数：</span>
                                                    <span>{ v.total_count }</span>
                                                </div>
                                                <div>
                                                    <span>总价：</span>
                                                    <span className="total-price">￥{ v.total_price }.00</span>
                                                </div>
                                                <div>
                                                    <span>状态：</span>
                                                    <span>待付款</span>
                                                </div>
                                            </div>
                                        </div>

                            </div>
                                : ''
                            ))
                            : ''} 
                    </div>
                    </WingBlank>
                    
                    <div >
                        
                    </div>
                    </Tabs>


                    <style jsx>{`
                        :global(.am-tabs) {
                            
                            position: fixed;
                            top: 45px;
                        }
                        .ellipsis-2 {
                            display: -webkit-box;
                            overflow: hidden;
                            white-space: normal!important;
                            text-overflow: ellipsis;
                            word-wrap: break-word;
                            -webkit-line-clamp: 2;
                            -webkit-box-orient: vertical;
                        }
                        .single-order-list {
                            margin-bottom: 10px;
                            background-color: #fff;
                            border-radius: 10px;
                            
                            .single-order {
                                padding: 5px;
                                display: flex;
                                align-items: center;
                                position: relative;

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
                                        font-size: 15px;
                                        color: #333;
                                        padding-right: 5px;

                                    }
                                    .num-price {
                                        font-size: 12px;
                                        color:#666;
                                        margin-top: 20px;
                                    }
                                    .order-price {
                                        position: absolute;
                                        bottom: 15px;
                                        color: red;

                                        span {
                                            font-size: 12px;
                                            &:nth-of-type(1) {
                                                margin-right: 5px;
                                            }
                                        }
                                    }
                                }

                            }

                            .order-infos {
                                padding: 10px;

                                .title {
                                    font-size: 13px;
                                    color: black;
                                    margin: 10px 0;
                                    position: relative;
                                    left: 10px;
                
                                    &:before {
                                        content: '';
                                        width: 2px;
                                        height: 16px;
                                        background-color: red;
                                        position: absolute;
                                        left: -10px;
                                        top: 50%;
                                        transform: translateY(-50%);
                                    }
                                }

                                .order-infos-content {
                                    >div {
                                        display: flex;
                                        font-size: 14px;
                                        color: #3e3e3e;
                                        // border-bottom: 0.5px dashed #ccc;
                                        padding-top: 5px;

                                        span:nth-of-type(1) {
                                            flex: 1;
                                        }

                                        span:nth-of-type(2) {
                                            flex: 2;
                                        }

                                        span.total-price {
                                            color: red;

                                            &::first-letter {
                                                font-size: 10px;
                                            }
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

export default OrderList
