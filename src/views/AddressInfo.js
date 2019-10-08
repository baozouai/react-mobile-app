import React, { Component } from 'react'
import { connect } from 'react-redux'
import { List, InputItem , NavBar, Icon, Toast, Flex, Button, WhiteSpace, Picker, TextareaItem} from 'antd-mobile';
import {cityData} from '../data/citys'
import { createForm } from 'rc-form';
import {withRouter} from 'react-router-dom'

export class AddressInfo extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             name: '',
             phone: '',
             address: '',
             emailCode: ''
        }
    }
    SaveAddressInfo = () => {
        // validateFields方法用于js校验, error是错误对象,如果没有就是null
        this.props.form.validateFields((error, value) => {
            if (error) {
                // 有错误,校验不通过
                Toast.fail('请检查数据是否填写正确', 2)
            } else {
                // 没有错误的话保存收货人信息
                let address = document.querySelector('.am-list-extra').innerText.split(',').join('') + this.state.address
                this.props.SaveAddressInfo(this.state.name, this.state.phone, address)
                Toast.success('修改成功，正在返回', 2, () => {
                    this.props.history.goBack()
                })
            }
    })
}
    render() {
        const { getFieldProps, getFieldError } = this.props.form;
        return (
            <div>
                <NavBar
                    mode="dark"
                    leftContent={<Icon type='left' />}
                    onLeftClick={() => this.props.history.goBack()}
                    className="nav-bar-style"
                >
                    编辑收货地址
                </NavBar>
                <List
                    style={{
                        marginTop: 45
                    }}
                >
                    <InputItem
                        placeholder="请输入收货人名字"
                        // 输入框尾部清空按钮 
                        clear
                        {...getFieldProps('name', {
                            // 输入框失焦时验证
                            validateTrigger: 'onBlur',
                            // 验证规则
                            rules: [
                                { required: true, message: "收货人名字不能为空" },
                                { min: 2, message: "收货人名字至少为2位" },
                            ]
                        })
                        }
                        // 验证不通过时设置error为true
                        error={getFieldError('name') ? true : false}
                        // 点击右侧的错误弹出提示
                        onErrorClick={() => {
                            Toast.info(getFieldError('name')[0], 2)
                        }}
                        // 输入框输入改变时同步数据到state中的name
                        onChange={v => {
                            this.setState({
                                name: v
                            })
                        }}
                        // 将state中的name赋值给输入框
                        value={this.state.name}
                    >
                       <span style={{color: 'red'}}>*</span> 收货人
                    </InputItem>
                    <InputItem
                        // 输入类型为手机号码
                        type="phone"
                        placeholder="请输入手机号码"
                        // 输入框尾部清空按钮
                        clear
                        {...getFieldProps('phone', {
                            // 输入框失焦时验证
                            validateTrigger: 'onBlur',
                            // 验证规则
                            rules: [
                                { required: true, message: "手机号码不能为空" },
                                { min: 11, message: "请输入11位手机号码" },
                            ]
                        })
                        }
                        // 验证不通过时设置error为true
                        error={getFieldError('phone') ? true : false}
                        // 点击右侧的错误弹出提示
                        onErrorClick={() => {
                            Toast.info(getFieldError('phone')[0], 2)
                        }}
                        // 输入框输入改变时同步数据到state中的phone
                        onChange={v => {
                            this.setState({
                                phone: v
                            })
                        }}
                        // 将state中的phone赋值给输入框
                        value={this.state.phone}
                    >
                       <span style={{color: 'red'}}>*</span> 手机号码
                    </InputItem>
                    <Picker
                        data={cityData}
                        title="Areas"
                        {...getFieldProps('district', {
                            initialValue: ["440000", "440100", "440106"],
                        })}
                        >
                        <List.Item arrow="horizontal"><span style={{color: 'red'}}>*</span>地区</List.Item>
                    </Picker>
                    
                    <InputItem
                        placeholder="请输入详细地址"
                        // 输入框尾部清空按钮
                        clear
                        {...getFieldProps('address', {
                            // 输入框失焦时验证
                            validateTrigger: 'onBlur',
                            // 验证规则
                            rules: [
                                { required: true, message: "详细地址不能为空" },
                                { min: 5, message: "详细地址至少为5位字符" },
                            ]
                        })
                        }
                        // 验证不通过时设置error为true
                        error={getFieldError('address') ? true : false}
                        // 点击右侧的错误弹出提示
                        onErrorClick={() => {
                            Toast.info(getFieldError('address')[0], 2)
                        }}
                        // 输入框输入改变时同步数据到state中的address
                        onChange={v => {
                            this.setState({
                                address: v
                            })
                        }}
                        // 将state中的address赋值给输入框
                        value={this.state.address}
                    >
                       <span style={{color: 'red'}}>*</span> 详细地址
                    </InputItem>
                    <InputItem
                        placeholder="请输入邮编（非必须）"
                        // 输入框尾部清空按钮
                        clear
                        // 输入框输入改变时同步数据到state中的emailCode
                        onChange={v => {
                            this.setState({
                                emailCode: v
                            })
                        }}
                        // 将state中的emailCode赋值给输入框
                        value={this.state.emailCode}
                    >
                       邮编
                    </InputItem>
                    <TextareaItem
                        placeholder="备注信息"
                        rows={5}
                        count={100}
                    />
                    <WhiteSpace />
                        <Flex justify="center">
                            <Button type="primary"   size="small" 
                                className="bottom-button"
                                style={{marginRight: 10}}
                                onClick={this.SaveAddressInfo}
                            >
                                保存
                            </Button>
                            <Button type="warning"  size="small" 
                                className="bottom-button"
                                onClick={this.props.history.goBack}
                            >
                                取消
                            </Button>      
                        </Flex>
                    <WhiteSpace/>     
                </List>
            </div>
        )
    }
}



const mapDispatchToProps = dispatch => {
    return {
        SaveAddressInfo: (name, phone, address) => {
            dispatch({type: 'SAVE_ADDRESS_INFO', payload: {name, phone, address}})
        }
    }    
}

export default connect(null, mapDispatchToProps)(createForm()(withRouter(AddressInfo)))
