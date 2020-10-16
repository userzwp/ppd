 import {request} from "../../request/home.js"
Page({
  data: {
    swiperList:[],
    catesList:[],
    floorList:[]
  },
  onLoad: function (options) {
    this.getSwiperList();
    this.getCatesList();
    this.getFloorList();
    // wx.request({
    //   url:"https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata",
    //   success:(res) => {
    //     this.setData({
    //       swiperList:res.data.message
    //     })
    //   } 
    // })
    
  },
  getSwiperList(){
    request({url:"/home/swiperdata"}).then(result=>{
      this.setData({
        swiperList:result.data.message
      })
    })
  },
  getCatesList(){
    request({url:"/home/catitems"}).then(result=>{
      this.setData({
        catesList:result.data.message
      })
})
  },
  getFloorList(){
    request({url:"/home/floordata"}).then(result=>{
      this.setData({
        floorList:result.data.message
      })
    })
  }



})