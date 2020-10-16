import {request} from "../../request/home.js" 
Page({

  data: {
    tabs:[
      {
      id:0,
      value:"综合",
      isActive:true
     },
     {
      id:1,
      value:"销量",
      isActive:false
     },
   {
    id:2,
    value:"价格",
    isActive:false
   }],
   goodsList:[]
  },
   queryParams:{
     query:"",
     cid:"",
     pagenum:1,
     pagesize:10
   },
   totalPages:1,

  onLoad: function (options) {
    this.queryParams.cid = options.cid
    this.getGoodsList()
  },
   getGoodsList(){
    
    request({url:"/goods/search",data:this.queryParams}).then(res=>{
      console.log(res)
      const total = res.data.message.total
      this.totalPages =Math.ceil(total / this.queryParams.pagesize)
      this.setData({
        goodsList:[...this.data.goodsList,...res.data.message.goods]
      })
      wx.stopPullDownRefresh();
    })
   },
  handleItemChang(e){
    const {index} = e.detail
    let {tabs} = this.data
    tabs.forEach((v,i)=>{
      return i===index?v.isActive=true:v.isActive=false
    })
    this.setData({
      tabs
    })
  },
  onReachBottom(){
    if(this.queryParams.pagenum >= this.totalPages){
      wx.showToast({
        title: '没有下一页数据啦',
      })
    }else{
        this.queryParams.pagenum++;
        this.getGoodsList()
    }
  },
  onPullDownRefresh(){
    this.setData({
      goodsList:[]
    });
    this.queryParams.pagenum = 1;
    this.getGoodsList()
  }
})