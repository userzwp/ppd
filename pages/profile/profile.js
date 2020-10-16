// pages/profile/profile.js
Page({
 data:{
   userinfo:{},
   collectNumber:0
 },
 onShow(){
   const userinfo = wx.getStorageSync('userinfo');
   const collect = wx.getStorageSync('collect')
   this.setData({
     userinfo,
     collectNumber:collect.length
   })
 }

})