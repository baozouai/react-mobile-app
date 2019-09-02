import React, { Component } from 'react'
import {getUserInfo} from '../api/index'
// import { connect } from 'react-redux'
import {Tabs, Badge, NavBar, Icon} from 'antd-mobile'
export class My extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             manage: true
        }
    }
    componentWillMount() {
        // 获取用户信息
        getUserInfo().then(res => {
            // console.log(res)
        })
    }
    toggle = () => {
      this.setState({manage: !this.state.manage})
    }
    render() {
        
        return (
            <div>
                
    
    <NavBar
                        mode="dark"
                        // style={{position: 'relative'}}
                        leftContent={<Icon type='left' />}
                        onLeftClick={() => this.setState({manage: this.state.manage? false: true})}
                        rightContent={
                            <div className="cart-footer-right">
                                <span onClick={() => {this.setState({manage: this.state.manage? false: true})
                            console.log(this.state.manage);
                        }}>{this.state.manage?'管理': '完成'}</span>
                            </div>
                        }
                        style={{
                            position: 'fixed',
                            width: '100%',
                            left: 0,
                            top: 0,
                            zIndex: 1
                        }}
                    >购物车
                    {/* <span onClick={() => this.setState({manage: this.state.manage? false: true})} style={{
                        color: '#fff',
                        }}>管理</span> */}
                    </NavBar>
                    <button onClick={this.toggle}>切换</button>
    <div style={{display: this.state.manage? 'block': 'none', marginTop: 100}}>111111111</div>
            </div>
        )
    }
}
// const mapStateToProps = (state) => {
//     console.log(state.CartModule);
//     return {
//         totalNum: state.CartModule.totalNum
//     }   
// }
export default My
