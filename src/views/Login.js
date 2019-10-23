import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import {connect} from 'react-redux'
import { List, InputItem, WhiteSpace, NavBar, Icon, Button, Toast, Flex } from 'antd-mobile';
import { createForm } from 'rc-form';
import {submitLogin, getCartGoods} from '../api/index'
import axios from 'axios'

export class Login extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // 预设用户名和密码为13999999999，123456
            // 用户名
            username: '',
            // 密码
            password: ''
        }
    }
    UNSAFE_componentWillMount() {
        if(!this.props.loginState && this.props.location.state && this.props.location.state.from.pathname !== '/login') {
            // 如果跳转之前的不是登录页面，跳转到登录页面时提示请登录
        // 先判断是否有this.props.location.state，有的话意味着是从其他需要登录才能访问的页面跳转过来，否则就是直接访问登录页面
            Toast.info('请先登录', 1)
        }
    }
    // 点击登录
    handleLogin = () => {
        this.props.form.validateFields((error, value) => {
            // value为getFieldProps中指定的值
            if (error) {
                // 有错误,校验不通过
                Toast.fail('请检查数据是否填写正确', 1)
            } else {
                let obj = {
                    // 这里的号码格式是139 9999 9999 ，提交之前把中间的空格去掉
                    username: value.username.replace(/\s/g, ''),
                    password: value.password
                  }
                submitLogin(obj).then(res => {
                    // 解构赋值
                    const {meta: {status, msg}, message} = res.data
                    // 状态码为200的即登录成功
                    if (status === 200) {
                        // 登录成功将token设置在请求头
                        let {token} = message
                        axios.defaults.headers.common['Authorization'] = token
                        // 修改userReducer中的登录状态
                        this.props.changeLoginState({Login: true, token})
                        // 登陆成功后同步购物车数据
                        getCartGoods().then(res => {
                            // 将数据解构处理
                            const { meta: { status }, message } = res.data
                            // 状态码200表示获取购物车数据成功
                            if (status === 200) {
                                // 判断购物车是否为空
                                if (message.cart_info) {
                                    // 不为空的话同步购物车，修改CartReducer中购物车数量
                                    this.props.snycCartGoods(Object.values(JSON.parse(message.cart_info)))
                                }
                
                            }
                
                        })
                        // 获取location中的from
                        const {from} = this.props.location.state || {from: {pathname: '/'}}
                        // 获取pathname
                        let pathname = from.pathname
                        if (pathname === '/login') {
                            pathname = '/'
                        }
                        // 登录成功的话弹框提示，1秒后消失
                        Toast.success(msg, 1, () => {
                            this.props.history.push(pathname)
                        })
                    } else {
                        // 否则提示错误信息
                        Toast.fail(msg, 1)
                    }
                })
            }
        })
        
    }
    
    render() {
        const { getFieldError, getFieldProps } = this.props.form;
        return (
            <div>
                {this.props.location.pathname === '/login'? 
                <NavBar
                    mode="dark"
                    leftContent={<Icon type='left' />}
                    onLeftClick={() => this.props.history.push('/')}
                    style={{
                        position: 'fixed',
                        width: '10rem',
                        left: '50%',
                        top: 0,
                        transform: 'translateX(-50%)',
                        zIndex: 1,
                    }}
                >
                    登录
                </NavBar>: ''}
                <List
                    style={{
                        marginTop: 45
                    }}
                    renderHeader={() => '请登录'}
                >
                    <InputItem
                        // 输入类型为手机号码
                        type="phone"
                        placeholder="请输入手机号码"
                        // 输入框尾部清空按钮
                        clear
                        {...getFieldProps('username', {
                            // 输入框失焦时验证
                            validateTrigger: 'onBlur',
                            // 验证规则
                            rules: [
                                { required: true, message: "用户名不能为空" },
                                { min: 11, message: "手机号码必须为11位" },
                            ]
                        })
                        }
                        // 验证不通过时设置error为true
                        error={getFieldError('username') ? true : false}
                        // 点击右侧的错误弹出提示
                        onErrorClick={() => {
                            Toast.info(getFieldError('username')[0], 2)
                        }}
                        // 输入框输入改变时同步数据到state中的username
                        onChange={v => {
                            this.setState({
                                username: v
                            })
                        }}
                        // 将state中的username赋值给输入框
                        value={this.state.username}
                    >
                        用户名
                    </InputItem>
                    <InputItem
                        type="password"
                        placeholder="请输入密码"
                        clear
                        {...getFieldProps('password', {
                            validateTrigger: 'onBlur',
                            rules: [
                                {
                                    required: true, message: '密码不能为空'
                                },
                                {
                                    min: 6, message: '密码不能低于6位'
                                }
                            ]
                        })}
                        error={getFieldError('password') ? true: false}
                        onErrorClick={() => {
                            Toast.fail(getFieldError('password')[0], 2)
                        }}
                        onChange={v => {
                            this.setState({
                                password: v
                            })
                        }}
                        value={this.state.password}
                    >
                        密码
                    </InputItem>
                    <WhiteSpace />
                        <Flex justify="center">
                            <Button type="primary"   size="small" 
                            className="bottom-button"
                            style={{marginRight: 10}}
                            onClick={this.handleLogin}>
                                立即登录
                            </Button>
                            <Button type="warning"  size="small" 
                            className="bottom-button"
                            onClick={() => this.props.history.push('/register')}>
                                免费注册
                            </Button>     
                        </Flex>
                    <WhiteSpace/>     
                </List>

                <style jsx>{`
                        .bottom-button {
                            width: 30%;
                            padding: 10px 0;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                        }
                `}</style>
            </div>
        )
    }
}
// // 创建state映射函数

const mapStateToProps = state => {
    return {
        loginState: state.userModule.loginState
    }
}

// 创建映射函数，登录成功改变userReducer中的登录状态为true
const mapActionToProps = dispatch => {
    return {
        changeLoginState: newState => {
            dispatch({type: 'CHANGE_LOGIN_STATE', payload: newState})
        },
        snycCartGoods: cart_Infos => {
            dispatch({type: 'SYNC_CART_GOODS', payload: {cart_Infos}})
        }
    }
}

export default connect(mapStateToProps, mapActionToProps)(createForm()(withRouter(Login)))
