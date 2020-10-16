import {request} from "../../request/home.js"
Page({

  data: {
    leftMenuList:[],
    rightContent:[],
    currentIndex:0,
    scrollTop:0,
    cid:""
  },
  Cates:[],
  onLoad: function (options) {
    const data = wx.getStorageSync('cates')
    if(!data){
      this.getCates() 
    }else{
      if(Date.now() - data.time >1000*10){
        this.getCates()
      }else{
        this.Cates = data.data;
        let leftMenuList = this.Cates.map(v=>v.cat_name)
        let rightContent = this.Cates[0].children
        this.setData({
          leftMenuList,
          rightContent,
        })
      }
    }
   
  },
    getCates(){
      request({
        url:"/categories"
      }).then(res=>{
        this.Cates = res.data.message;
        wx.setStorageSync('cates', {time:Date.now(),data:this.Cates})
        let leftMenuList = this.Cates.map(v=>v.cat_name)
        let rightContent = this.Cates[0].children
        this.setData({
          leftMenuList,
          rightContent
        })
      })
    },
    handleItem(e){
       const {index} = e.currentTarget.dataset;
      this.setData({
        currentIndex:index,
        rightContent:this.Cates[index].children,
        scrollTop:0,
        cid:this.Cates[index].children.cat_id
      })
    },
  
})