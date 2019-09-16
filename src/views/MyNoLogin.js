import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import {WingBlank, Flex, TabBar} from 'antd-mobile'
export class MyNoLogin extends Component {
    render() {
        return (
            <div>
                <header>
                    <div className="title">我的</div>
                    <WingBlank style={{ marginTop: 20}}>

                        <Flex justify="between">
                            <div className="avatar">
                                <div className="wrapper">
                                    <i className="iconfont icon-icontouxiang"></i>
                                </div>
                                <span>未登录</span>
                            </div>
                            <button className="goto-login" onClick={() => this.props.history.push('/login')}>立即登录</button>
                        </Flex>
                    </WingBlank>
                </header>
                <div className="my-order">我的订单</div>
                <TabBar
                    unselectedTintColor="#949494"
                    tintColor="#33A3F4"
                    barTintColor="white"
                >
                    <TabBar.Item
                        title="所有订单"
                        key="Home"
                        icon={<i className="iconfont icon-dingdan"></i>}
                        onPress={() => { this.props.history.push('/order/0') }}
                    >
                    </TabBar.Item>
                    <TabBar.Item
                        title="待付款"
                        key="obligation"
                        icon={<i className="iconfont icon-daifukuan"></i>}
                        onPress={() => { this.props.history.push('/order/1') }}
                    >
                    </TabBar.Item>
                    <TabBar.Item
                        title="待发货"
                        key="Mine"
                        icon={<i className="iconfont icon-daifahuo"></i>}
                        onPress={() => { this.props.history.push('/order/2') }}
                    >
                    </TabBar.Item>
                </TabBar>
                <style jsx>{`
                    header {
                        height: 120px;
                        width: 100%;
                        background-color: #33A3F4;
                       .title {
                           text-align: center;
                           padding-top: 10px;
                           font-size: 18px;
                           color: #fff;
                       }
                            .avatar {
                               
                                display: flex;
                                align-items: center;
                                .wrapper {
                                    width: 55px;
                                    height: 55px;
                                    background-color: #fff;
                                    border-radius: 50%;
                                    display: flex;
                                    margin-left: 5px;
                                    content-justify: center;
                                    .icon-icontouxiang {
                                        font-size: 40px;
                                        margin: 0 auto;
                                        color: skyblue;
                                    }
                                }
                                span {
                                    color: #fff;
                                    font-size: 18px;
                                    margin-left: 5px;
                                }
                            
                            }
                            
                            .goto-login {
                                width: 100px;
                                color: #fff;
                                border: 1px solid #fff;
                                background-color: inherit;
                                padding: 10px;
                                border-radius: 5px;
                            }
                    }
                    .my-order {
                                height: 50px;
                                background-color: #fff;
                                line-height: 50px;
                                padding-left: 10px;
                                color: #5f5b5b;
                                font-size: 16px;
                            }
                `}</style>
            </div>
        )
    }
}

export default withRouter(MyNoLogin)
