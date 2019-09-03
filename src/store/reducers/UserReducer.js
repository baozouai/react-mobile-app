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
            // 登录成功则将token存入本地存储，退出则将本地存储的token移除
            action.payload.Login ? sessionStorage.setItem('token', action.payload.token) : sessionStorage.removeItem('token')
            return {...state, loginState: action.payload.Login}
        case 'SAVE_ADDRESS_INFO': 
            let {name, phone, address} = action.payload
            return {...state, name, phone, address}
        default:
            return {...state, loginState: sessionStorage.getItem('token')? true: false}
    }
    
}