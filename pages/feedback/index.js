// pages/feedback/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs:[
      {
      id:0,
      value:"体验问题",
      isActive:true
     },
     {
      id:1,
      value:"商品-商家投诉",
      isActive:false
     }],
     chooseImages:[],
     textValue:""
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
  handleChooseImg(){
    console.log()
    wx.chooseImage({
      count:9,
      sizeType:["original","compressed"],
      sourceType:["album","camera"],
    success:res=>{
       this.setData({
        chooseImages:[...this.data.chooseImages,...res.tempFilePaths]
       })
    }

    })
  },
  handleRemoveImg(e){
    const {index} = e.currentTarget.dataset;
    let chooseImages = this.data.chooseImages;
    chooseImages.splice(index,1)
    this.setData({
    chooseImages
    })
  },
  handleText(e){
    this.setData({
      textValue:e.detail.value
    })
  },
  upLoadImage:[],
  handleForm(){
    const {textValue,chooseImages} = this.data;
    if(!textValue.trim()){
      wx.showToast({
        title: '请输入描述',
        icon:"none",
        mask:true
      })
      return 
    }
    chooseImages.forEach((v,i)=>{
    wx.uploadFile({
      filePath: v,
      name: 'file',
      url: 'https://clubajax.autohome.com.cn/Upload/UpImageOfBase64New?dir=image&cros=autohome.com.cn',
      formData:{},
      success:res=>{
          let url = JSON.parse(res.data);
          this.upLoadImage.push(url)
      }
    })
  })
  }
})