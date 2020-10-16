import {request} from "../../request/home.js"
Page({

  handleInput(e){
   const {value} = e.detail;
   if(!value.trim()){
     this.setData({
       goods:[],
       isFocus:false,
       inputValue:""
     })
     return;
   }
   this.setData({
     isFocus:true
   })
   clearTimeout(this.timeId);
  this.timeId = setTimeout(()=>{
    this.getSearch(value)
  },1000)
   
  },
  async getSearch(value){
   const res = await request({
     url:"/goods/qsearch",
     data:{query:value}
   })
   this.setData({goods:res.data.message})
  },
  handleCance(){
    this.setData({
      goods:[],
      isFocus:false,
      inputValue:""
    })
  }
})