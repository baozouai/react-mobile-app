let initState = {
    totalNum: 0
}

export const CartReducer = (state = initState, action) => {
    switch (action.type) {
        // 同步购物车数据
        case 'SYNC_CART_GOODS':
            let {cartInfos} = action.payload
            var totalNum = 0;
            // 通过循环遍历获取购物车商品总量
            cartInfos.forEach(v => totalNum += v.amount)
            // 返回新的数据
            return {...state, totalNum}
        case 'ADD_CART':
            state.totalNum += 1
            return {...state}
        default:
            // 返回默认数据
            return state
    }
    
}