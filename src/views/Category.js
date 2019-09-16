import React, { Component, Fragment } from 'react'
import { Tabs, NavBar, Icon } from 'antd-mobile'
import { getCategory } from '../api/index'
import { withRouter } from 'react-router-dom'
import qs from 'querystring'
export class Category extends Component {
    constructor(props) {
        super(props)

        this.state = {
            categories: [],
        }
    }

    UNSAFE_componentWillMount() {
        // 页面加载前获取分类数据
        getCategory().then(res => {
            const { meta: { status }, message } = res.data
            if (status === 200) {
                this.setState({
                    categories: message
                })
            }
        })
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
                            style={{
                                position: 'fixed',
                                width: '100%',
                                left: 0,
                                top: 0,
                                right: 0,
                                zIndex: 1000
                            }}
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
                                    backgroundColor: '#f7f7f7',
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
                                    padding-bottom: 41px;
                            }
                                
                            :global(.am-tabs-default-bar-left) {
                                padding-bottom: 50px;
                            }
                                
                            :global(.am-tabs-pane-wrap) {
                                background-color: #fff;
                                padding-bottom: 50px;
                            }
                            :global(.am-tabs) {
                                position: fixed;
                                top: 45px;
                            }
                            .cateItem {
                                background-color:#fff;
                                margin-bottom:45px;
                                .cate_title {
                                    color: steelblue;
                                    font-size: 20px;
                                    font-weight: bold;
                                    padding-top: 10px;
                                    text-indent: 1em; 
                                }
                            .cate_content {
                                display: flex;
                                flex-wrap: wrap;
                                div {
                                    display: block;
                                    width: 33.3%;
                                    text-align: center;
                                    margin-bottom: 10px;
                                    img {
                                        width: 70%;
                                        display: inline-block;
                                    }
                                    @media screen and (max-width: 400px) {
                                        img {
                                            width: 60%;
                                        }
                                    }
                                    .cat_name {
                                        display: block;
                                        font-size: 12px;
                                        color: #666;
                                    }
                                }
                            }
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
