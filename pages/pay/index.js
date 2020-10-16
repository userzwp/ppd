import {request} from "../../request/home.js"
import {requestPayment,showToast} from "../../utils/asyncWx.js"
Page({
  data: {
     address:{},
     cart:[],
     totalPrice:0,
     totalNum:0
  },
  onShow(){
    const address = wx.getStorageSync('address');
    let cart = wx.getStorageSync("cart") || [];
     cart = cart.filter(v=>v.checked)
    let totalPrice = 0;
    let totalNum =0;
    cart.forEach(v => {
      if(v.checked){
        totalPrice += v.num * v.goods_price;
        totalNum += v.num; 
      }
    });
    this.setData({
      cart,
      totalPrice,
      totalNum,
      address
    })
  },
  async handlePay(){
    try {
      const token = wx.getStorageSync('token');
    if(!token){
      wx.navigateTo({
        url: '/pages/auth/index',
      });
    }
    const header = {Authorizetion:token};
    const order_price = this.data.totalPrice;
    const consignee_addr = this.data.address.all;
    const cart = this.data.cart;
    let goods =[];
    cart.forEach(v => goods.push({
      goods_id:v.goods_id,
      goods_number:v.num,
      goods_price:v.goods_price
    }))
    const orderParams = {order_price,consignee_addr,goods}
    //{order_number}
    const {order_number} = await request({
      url:"/my/orders/create",
      method:"POST",
      data:orderParams,
      header:header
    })

    const {pay} =await request({
      url:"/my/orders/req_unifiedorder",
      method:"POST",
      header:header,
      data:{order_number}
    });
     await requestPayment(pay);
    const res = await request({
      url:"/my/orders/chkOrder",
      method:"POST",
      header,
      data:{order_number}
    });
    await showToast({title:"支付成功"});
    let newCart = wx.getStorageSync('cart');
    newCart = newCart.filter(v => !v.checked);
    wx.setStorageSync('cart', newCart)
    wx.navigateTo({
      url: '/pages/order/index'
    })
    } catch (error) {
      await showToast({title:"支付失败"})
    }
  }
})