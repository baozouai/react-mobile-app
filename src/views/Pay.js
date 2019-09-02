import React, { Component } from 'react'
import { createForm } from 'rc-form';
import { NavBar, Icon, Picker, List, WhiteSpace } from 'antd-mobile'
import { district, provinceLite } from 'antd-mobile-demo-data';
export class Pay extends Component {
    render() {
        const { getFieldProps } = this.props.form;
        return (
            <div>
                {/* 顶部导航条 */}
                <NavBar
                    mode="dark"
                    leftContent={<Icon type='left' />}
                    onLeftClick={() => this.props.history.goBack()}
                    style={{
                        position: 'fixed',
                        width: '100%',
                        left: 0,
                        top: 0,
                        right: 0,
                        zIndex: 1000
                    }}
                >确认订单</NavBar>
                
                <List style={{ backgroundColor: 'white', marginTop: 45}} className="picker-list">
                    <Picker extra="请选择(可选)"
                        data={district}
                        title="Areas"
                        {...getFieldProps('district', {
                            initialValue: ['340000', '341500', '341502'],
                        })}
                        onOk={e => console.log('ok', e)}
                        onDismiss={e => console.log('dismiss', e)}
                    >
                        <List.Item arrow="horizontal">请选择地址</List.Item>
                    </Picker>
                    
                    
                    
                    
                    
                    
                </List>
            </div>
        )
    }
}

export default createForm()(Pay)
