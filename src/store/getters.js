const getters={
  cartLength(state,getters){
    return getters.cartList.length
  },
  cartList(state){
    return state.cartList
  }
}

export default getters
