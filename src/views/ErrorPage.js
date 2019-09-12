import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {WingBlank} from 'antd-mobile'
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
                <style jsx>{`
                    .tips {
                        font-size: 25px;
                        margin: 20px auto;
                    }
                    .reason {
                        line-height: 1.6em;
                        margin-bottom: 25px;
                        li {
                            span {
                            color: #ccc;
                            padding-left: 5px;
                            .gt {
                                font-size: 10px;
                                font-style: normal;
                                }
                            }
                        }
                    }
                    .links {
                        color: #ccc;
                        line-height: 2em;
                        :global(a) {
                            color: #0B72A4;
                        }
                        span {
                            color: #ccc;
                            padding: 0 3px;
                        }
                    }
                    
                `}</style>
            </div>
        )
    }
}

export default ErrorPage
