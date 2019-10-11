import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { SearchBar } from 'antd-mobile';
import { searchSuggest } from '../api/index'
import {WingBlank} from 'antd-mobile'
import '../style/searchfield.css'
export class SearchField extends Component {
    constructor(props) {
        super(props)

        this.state = {
            suggestData: [],
            height: document.documentElement.clientHeight
        }
    }
    handleSearch = value => {
        this.props.history.push('/searchgoods/query=' + value)

    }
    // 搜索建议
    handleSearchSuggest = value => {
        searchSuggest(value).then(res => {
            const {meta: {status}, message: {goods}} = res.data
            if (status === 200) {
                // 只获取前十条数据
                this.setState({
                    suggestData: goods.slice(0, 10)
                })
            }
        })
    }
    // 点击搜索建议跳转到商品列表页面    
    handleSearchSimilar = cid => {
        this.props.history.push('/searchgoods/cid=' + cid)
    }
    UNSAFE_componentDidMount() {
        // 自动聚焦
        this.autoFocusInst.focus();
    }
    render() {
        return (
            <div style={{ height: '100%', backgroundColor: '#efeff4'}}>
                <div style={{display: 'flex'}}>
                    <i className="iconfont icon-arrow-left" 
                    style={{width: 30, alignSelf: 'center',  padding: '0 10px'}}
                    onClick={() => this.props.history.push('/')}
                    ></i>
                    <SearchBar placeholder="请输入商品"
                    style={{flex: 1}}
                    onCancel={v => this.handleSearch(v)}
                    onSubmit={v => this.handleSearch(v)}
                    ref={ref => this.autoFocusInst = ref}
                    cancelText="搜索"
                    onChange={v => {
                        // 中文输入法下输入时会出现先英文，如n'i'h'a'o => 你好，中间会有'的标点，
                        // 通过判断是否带有此符号来判断是否继续获取搜索建议
                        if (v.indexOf("'") === -1) {
                            this.handleSearchSuggest(v)
                        }
                    }}
                />
                </div>
                <WingBlank>
                    <ul className="suggest-list">
                        {this.state.suggestData.map(v => (
                            // 点击搜索建议跳转到商品列表页面
                            <li key={v.goods_id} onClick={() => this.handleSearchSimilar(v.cat_id)}>
                                <span className="left">{v.goods_name.slice(0, 20)}...</span> 
                                <span className="right">↖</span>
                            </li>
                        ))}
                    </ul>
                </WingBlank>
            </div>
        )
    }
}

export default withRouter(SearchField)
