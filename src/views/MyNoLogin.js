import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import {WingBlank, Flex, TabBar} from 'antd-mobile'
import '../style/mynologin.css'
export class MyNoLogin extends Component {
    render() {
        return (
            <div>
                <header>
                    <div className="title">我的</div>
                    <WingBlank style={{ marginTop: '0.53333333333rem'}}>

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
                
            </div>
        )
    }
}

export default withRouter(MyNoLogin)
