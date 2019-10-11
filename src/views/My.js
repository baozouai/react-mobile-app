import React, { Component } from 'react'
import { getUserInfo } from '../api/index'
import { withRouter } from 'react-router-dom'
import { TabBar, Card, Button, Modal } from 'antd-mobile'
import { connect } from 'react-redux'
import avatar from '../upload/avatar.png'
const alert = Modal.alert;
export class My extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }
    UNSAFE_componentWillMount() {
        // 获取用户信息
        getUserInfo().then(res => {
            const { meta: { status }, message } = res.data
            if (status === 200) {
                this.setState({
                    phone: message.user_tel
                })
            }
        })
    }
    // 退出
    logout = () => {
        alert('即将退出账号', '您确定吗?', [
            {
                text: '我还没逛完', 
                style: {
                    backgroundColor: '#777',
                    color: '#fff',
                    fontWeight: 700
                }
            },
            {
                text: '确定', 
                style: {
                    backgroundColor: 'rgb(244, 51, 60)',
                    color: '#fff',
                    fontWeight: 700
                }, 
                onPress: () => {
                    // 退出
                    this.props.loginOut()
                    // 清除cartReducer中的数据
                    this.props.clearCartData()
                    this.props.history.push('/mynologin')
                }
            }
        ])
    }
    render() {
        return (
            <div>
                <Card>
                    <Card.Header
                        title="暴走"
                        thumb={avatar}
                        thumbStyle={{ width: 43 }}
                        style={{ fontSize: 15 }}
                        extra={<span style={{ fontSize: 13 }}>{this.state.phone}</span>}
                    />
                    <Card.Header
                        title="我的订单"
                        style={{ fontSize: 15 }}
                    />
                </Card>
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
                <Button onClick={this.logout}>退出登录</Button>
            </div>
        )
    }
}
// 创建映射函数
const mapDispatchToProps = (dispatch) => {
    return {
        // 退出
        loginOut: () => {
            dispatch({ type: 'LOGINOUT' })
        },
        // 清除cartReducer中的数据
        clearCartData: () => {
            dispatch({ type: 'CLEAR' })
        }
    }
}
// 由于这里没有mapStateToProps，所以connect第一个参数设置为null
export default connect(null, mapDispatchToProps)(withRouter(My))
