import React, { Component } from 'react'
import {getUserInfo} from '../api/index'
// import { connect } from 'react-redux'
import {Tabs, Badge, NavBar, Icon} from 'antd-mobile'
import {getCartGoods, syncCart} from '../api/index'
export class My extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             manage: true
        }
    }
    // syncCart({ infos: JSON.stringify({4932:JSON.parse(res.data.message.cart_info.replace(/null,/g, ''))[0]}) })
    componentWillMount() {
        // 获取用户信息
        getUserInfo().then(res => {
            // console.log(res)
        })
        // getCartGoods().then(res => {
        //     console.log(JSON.parse(res.data.message.cart_info));
        //     syncCart({ infos: JSON.stringify({}) })
        //         // console.log(res.data.message.cart_info.replace(/null,/g, ''));
        //         // console.log({4932:JSON.parse(res.data.message.cart_info.replace(/null,/g, ''))[0]});
        // })
    }
    toggle = () => {
      this.setState({manage: !this.state.manage})
    }
    render() {
        
        return (
            <div>
                
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
