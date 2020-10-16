import {request} from "../../request/home.js"
Page({
  data: {
   goodsObj:{},
   isCollect:false
  },
  goodsInfo:{},
  onShow: function () {
    let pages = getCurrentPages();
   let options = pages[pages.length - 1].options
    const {goods_id} = options
    this.getGoodsDetail(goods_id)

  },
  getGoodsDetail(goods_id){
    request({url:"/goods/detail",data:{goods_id}}).then(res=>{
      this.goodsInfo = res.data.message; 
    let collect = wx.getStorageSync('collect') || [];
    let isCollect = collect.some(v=>v.goods_id === this.goodsInfo.goods_id);
     this.setData({
       goodsObj:{
         goods_name:res.data.message.goods_name,
         goods_price:res.data.message.goods_price,
         goods_introduce:res.data.message.goods_introduce.replace(/\.webp/g,".jpg"),
         pics:res.data.message.pics
       },
       isCollect
     })
    })
  },
  handleCartAdd(){
    let cart = wx.getStorageSync('cart') || [];
    let index = cart.findIndex(v =>v.goods_id===this.goodsInfo.goods_id);
    if(index === -1){
     this.goodsInfo.num =1;
     this.goodsInfo.checked = true;
     cart.push(this.goodsInfo)
    }else{
      cart[index].num++;
    }
    wx.setStorageSync('cart', cart);
    wx.showToast({
      title: '加入成功',
      icon:"success",
      mask:true
    })
  },
  collectChange(){
    let isCollect = false
     let collect = wx.getStorageSync('collect') || [];
     let index = collect.findIndex(v=>v.goods_id === this.goodsInfo.goods_id);
     if(index !== -1){
       collect.splice(index,1);
       isCollect = false;
       wx.showToast({
         title: '取消成功',
         icon:"success",
         mask:true
       })
     }else{
       collect.push(this.goodsInfo)
       isCollect = true;
       wx.showToast({
         title: '收藏成功',
         icon:"success",
         mask:true
       })
     }
     wx.setStorageSync('collect', collect);
     this.setData({isCollect})
  }
})