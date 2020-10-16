 import {request} from "../../request/home.js"
Page({
  data: {
    orders:[]
  },
  onShow(){
    let pages = getCurrentPages();
     let {type} = pages[pages.length - 1].options
    const token = wx.getStorageSync('token')
    if(!token){
      wx.navigateTo({
        url: '/pages/auth/index',
      });
    }
      this.getOrders()
  },
  async getOrders(type){
    const  res = await request({
    url:"/my/orders/all",
    data:{type},
    header:{
      Authorizetion:token
    }
  })
   this.setData({
     orders:res
   })
  }

})