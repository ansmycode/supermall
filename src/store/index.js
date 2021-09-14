 import Vue from 'vue'
 import Vuex from 'vuex'
 import getters from './getters.js'
 Vue.use(Vuex)

 const store = new Vuex.Store({
  state:{
    cartList:[]
  },
  mutations:{
    addCounter(state,payload){
      payload.count++
    }
  },
  actions:{
    addCart(context,payload){
      //判断原来的购物车是否已经有这个商品了
      let oldproduct = context.state.cartList.find(item=>item.iid === payload.iid)

      if(oldproduct){
        context.commit('addCounter',oldproduct)
      }else{
        payload.count=1
        payload.checked=true
        context.state.cartList.push(payload)
      }
    }
  },
  getters
 })

 export default store
