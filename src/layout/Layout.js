import React, { Component } from 'react'
import { TabBar } from 'antd-mobile';
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
export class Layout extends Component {
  render() {
    return (
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
          title="首页"
          key="Home"
          icon={<i className="iconfont iconhome"></i>}
          selectedIcon={<i className="iconfont iconhome" style={{color: '#33A3F4'}}></i>}
          selected={this.props.location.pathname === '/'}
          onPress={() => {this.props.history.push('/')}}
        >
          {/* 利用props.children接收Layout组件innerHTML位置的内容 */}
          {this.props.children}
        </TabBar.Item>
        <TabBar.Item
          title="分类"
          key="Category"
          icon={<i className="iconfont icon-fenlei"></i>}
          selectedIcon={<i className="iconfont icon-fenlei" style={{color: '#33A3F4'}}></i>}
          selected={this.props.location.pathname === '/category'}
          onPress={() => {this.props.history.push('/category')}}
        >

          {this.props.children}
        </TabBar.Item>
        <TabBar.Item
          title="购物车"
          key="Cart"
          icon={<i className="iconfont icongouwuche1"></i>}
          selectedIcon={<i className="iconfont icongouwuche1" style={{color: '#33A3F4'}}></i>}
          selected={this.props.location.pathname === '/cart'}
          onPress={() => {this.props.history.push('/cart')}}
        >
          {this.props.children}
        </TabBar.Item>
        <TabBar.Item
          title={this.props.loginState?'我的': '未登录'}
          key="Mine"
          icon={<i className="iconfont iconweibiaoti2fuzhi12"></i>}
          selectedIcon={<i className="iconfont iconweibiaoti2fuzhi12" style={{color: '#33A3F4'}}></i>}
          selected={['/login', '/register', '/my', '/mynologin'].includes(this.props.location.pathname)}
          onPress={() => {this.props.loginState? this.props.history.push('/my'): this.props.history.push('/mynologin')}}
        >
          {this.props.children}
        </TabBar.Item>
      </TabBar>
      
    )
  }
}

const mapStateToProps = state => {
  return {
    loginState: state.userModule.loginState
  }
}

export default connect(mapStateToProps)(withRouter(Layout))
