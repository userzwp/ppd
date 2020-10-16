// components/tabs/tabs.js
Component({
  properties: {

  },

  data: {
   tabs:[
    {
      id:0,
      value:"全部",
      isActive:true
     },
     {
      id:1,
      value:"待付款",
      isActive:false
     },
   {
    id:2,
    value:"待发货",
    isActive:false
   },
   {
    id:3,
    value:"退款/退货",
    isActive:false
   }
   ],
   current:0
  },

  methods: {
    handleItem(e){
     const {index} = e.currentTarget.dataset;
     this.setData({
      current:index
     })
    }
  }
})
