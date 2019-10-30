// 初始token为空
let initState = {
    loginState: false,
    name: '暴走',
    phone: 13999999999,
    address: '广东省广州市天河区...'
}
export const UserReducer = (state = initState, action) => {
    switch (action.type) {
        // 如果改变了登录状态
        case 'CHANGE_LOGIN_STATE':
            // 登录成功则将token存入会话存储
            if (action.payload.Login) {
                sessionStorage.setItem('token', action.payload.token)
            }
            return {...state, loginState: action.payload.Login}
        // 保存地址信息
        case 'SAVE_ADDRESS_INFO': 
            return {...state, ...action.payload}
        // 退出账号
        case 'LOGINOUT':
            sessionStorage.removeItem('token')
            return {...state, loginState: false}
        default:
            return {...state, loginState: sessionStorage.getItem('token')? true: false}
    }
}