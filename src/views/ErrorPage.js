import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { WingBlank } from 'antd-mobile'
import '../style/errorpage.css'
export class ErrorPage extends Component {
    render() {
        return (
            <div>
                <WingBlank>
                    <div className="tips">抱歉!  您访问的页面失联啦...</div>
                    <div className="reason">
                        <p>可能因为：</p>
                        <ul className="reason-list">
                            <li>网址有错误<span><i className="gt">&gt;</i>请检查地址是否完整或存在多余字符</span></li>
                            <li>网址已失效<span><i className="gt">&gt;</i>可能页面已删除，活动已下线等</span></li>
                        </ul>
                    </div>
                    <div className="links">
                        <p>或者逛逛：
                        <Link to="/">商城首页</Link>
                        <span>|</span>
                        <Link to="/searchfield">搜宝贝</Link>
                        <span>|</span>
                        <Link to="/category">商品分类</Link>
                        </p>
                    </div>
                </WingBlank>
                
            </div>
        )
    }
}

export default ErrorPage
