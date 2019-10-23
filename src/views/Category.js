import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import { Tabs, NavBar, Icon } from 'antd-mobile'
import { getCategory } from '../api/index'
import qs from 'querystring'
import '../style/category.css'

export class Category extends Component {
    constructor(props) {
        super(props)

        this.state = {
            categories: [],
        }
    }

    UNSAFE_componentWillMount() {
        // 页面加载前获取分类数据
        // 判断sessionStorage是否存储了数据
        if (sessionStorage.getItem('categories')) {
            // 有的话直接从回话拉取数据
            this.setState({
                // 数据先解析
                categories: JSON.parse(sessionStorage.getItem('categories'))
            })
            
        } else {
            // 否则请求接口获取分类数据
            getCategory().then(res => {
                const { meta: { status }, message } = res.data
                if (status === 200) {
                    this.setState({
                        categories: message
                    })
                }
                // 这里数据要先用json转换，否则sessionStorage中的是'[Object Object]'
                sessionStorage.setItem('categories', JSON.stringify(message))
            })
            
        }
    }

    render() {
        let cates = this.state.categories.map(v => {
            return {
                ...v,
                //由于antd mobile的tabs需要title，故加上
                title: v.cat_name
            }
        })
        return (
            <div>
                {this.props.location.pathname === "/category" ?
                    <Fragment>
                        <NavBar
                            mode="dark"
                            leftContent={<Icon type='left' />}
                            onLeftClick={() => this.props.history.goBack()}
                            className="nav-bar-style"
                        >商品分类</NavBar>

                        <Tabs className="tabs"
                            tabs={cates}
                            initalPage={0}
                            animated={false}
                            useOnPan={true}
                            tabBarTextStyle={
                                {
                                    width: 86,
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap',
                                    color: '#666',
                                    fontSize: 13
                                }
                            }
                            // 一页显示12个
                            renderTabBar={props => <Tabs.DefaultTabBar {...props} page={12} />}
                            // 靠左
                            tabBarPosition="left"
                            // 内容垂直
                            tabDirection="vertical"
                        >
                            {cates.length ? cates.map(v => (
                                v.children.map(v1 => (
                                    v1.children ?
                                        <div key={v1.cat_id} className="cateItem">
                                            <div className="cate_title">{v1.cat_name}</div>
                                            <div className="cate_content">
                                                {v1.children.map(
                                                    v2 => (
                                                        <div key={v2.cat_id} onClick={() => this.props.history.push('/searchgoods/' + qs.stringify({ cid: v2.cat_id }))}>
                                                            <img src={v2.cat_icon} alt="" />
                                                            <span className="cat_name">{v2.cat_name}</span>
                                                        </div>
                                                    )
                                                )}
                                            </div>
                                        </div>
                                        : ''
                                ))
                            )) : ''}

                        </Tabs>
                        <style jsx>{`
                        :global(.am-tabs-tab-bar-wrap) {
                            padding-bottom: 45px;
                        }

                        :global(.am-tabs-default-bar-left) {
                        padding-bottom: 51px;
                        background-color: #f7f7f7 !important;
                        }

                        :global(.am-tabs-pane-wrap) {
                        background-color: #fff;
                        padding-bottom: 52px;
                        }
                        :global(.am-tabs) {
                        position: fixed;
                        top: 45px;
                        }
                `}</style>
                    </Fragment>
                    : ''}
                {/* 顶部导航条 */}


            </div>
        )
    }
}
export default withRouter(Category)
