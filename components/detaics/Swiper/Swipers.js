// components/detaics/Swiper/Swiper.js
Component({
  properties: {
    goodsObj:{
      type:Object,
      value:{}
    }
  },
  data: {
  },
  methods: {
    handleImg(e){
      const urls = this.properties.goodsObj.pics.map(v=>v.pics_mid)
      const current = e.currentTarget.dataset.url
      wx.previewImage({
        current,
        urls
      })
    }
  }

})
