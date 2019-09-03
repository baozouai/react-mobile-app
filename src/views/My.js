import React, { Component } from 'react'
import {getUserInfo} from '../api/index'
import avatar from '../upload/avatar.png'
import {TabBar, NavBar, Icon, Card, Button, Modal} from 'antd-mobile'
import {connect} from 'react-redux'
const alert = Modal.alert;
export class My extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            
        }
    }
    componentWillMount() {
       
        // 获取用户信息
        getUserInfo().then(res => {
            console.log(res.data)
            const {meta: {status}, message} = res.data
            this.setState({
                phone: message.user_tel,
                email: message.user_email,
                sex: message.user_sex
            })
        })
       
    }
    
    // 退出
    logout = () => {
        alert('即将退出账号', '您确定吗?', [
            {
                text: '我还没逛完', style: {
                    backgroundColor: '#777',
                    color: '#fff',
                    fontWeight: 700
                }
            },
            {
                text: '确定', style: {
                    backgroundColor: 'rgb(244, 51, 60)',
                    color: '#fff',
                    fontWeight: 700
                }, onPress: () => this.props.loginOut()
            }
        ])
    }
    
    
    render() {
        const { files } = this.state;
        return (
            <div>
                <Card>
                <Card.Header
                    title="暴走"
                    thumb="https://baozouai.com/img/avatar.png"
                    thumbStyle={{width: 43}}
                    style={{fontSize: 15}}
                    extra={<span style={{fontSize: 13}}>{this.state.phone}</span>}
                />
                
                <Card.Header
                    title="我的订单"
                    style={{fontSize: 15}}
                />
        </Card>
        <TabBar
        unselectedTintColor="#949494"
        tintColor="#33A3F4"
        barTintColor="white"
      >
        {/* 
          unselectedTintColor	未选中的字体颜色
          tintColor	选中的字体颜色
          barTintColor	tabbar背景色
       */}
        {/*
          title	标题文字
          key	唯一标识
          icon 未选中的图标
          selectedIcon 选中的图标
          selected 是否选中
          badge 徽标
        */}
        <TabBar.Item
          title="所有订单"
          key="Home"
          icon={<i className="iconfont icon-dingdan"></i>}
          onPress={() => {this.props.history.push('/order/0')}}
        >

        </TabBar.Item>
        <TabBar.Item
          title="待付款"
          key="a"
          icon={<i className="iconfont icon-daifahuo"></i>}
          onPress={() => {this.props.history.push('/order/1')}}
        >

        </TabBar.Item>
        <TabBar.Item
          title="待发货"
          key="Mine"
          icon={<i className="iconfont icon-daifahuo"></i>}
          onPress={() => {this.props.history.push('/order/2')}}
        >

        </TabBar.Item>
      </TabBar>
        <Button onClick={this.logout}>退出登录</Button>
                <style jsx>{`
                    
                `}</style>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loginOut: () => {
            dispatch({type: 'LOGINOUT'})
        }
    }
}

export default connect(null, mapDispatchToProps)(My)
