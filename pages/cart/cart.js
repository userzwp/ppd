// pages/cart/cart.js
import {getSetting,openSetting,chooseAddress,
  showModal,showToast} from "../../utils/asyncWx.js"
Page({
  data: {
     address:{},
     cart:[],
     allChecked:false,
     totalPrice:0,
     totalNum:0
  },
  onShow(){
    const address = wx.getStorageSync('address');
    const cart = wx.getStorageSync("cart") || [];
    // const allChecked = cart.length?cart.every(v=>v.checked):false;
    this.setData({
      address
    })
     this.setCart(cart)
  },
 async handleAddress(){
  try {
    
  const res1 = await getSetting();
  const scopeAddress = res1.authSetting["scope.address"];
  if(scopeAddress === false){
    await openSetting();
  }
  const address = await chooseAddress();
  address.all = address.provinceName+address.cityName+address.countyName+address.detailInfo
   wx.setStorageSync('address', address)
  } catch (error) {
    console.log(error)
  }

//  wx.chooseAddress({
//   success:(result) => {
//     console.log(result)
//   }
//  })

// wx.getSetting({
//   success:(result) => {
//     console.log(result)
//     const scopeAddress = result.authSetting["scope.address"];
//     if(scopeAddress == true || scopeAddress === undefined){
//       wx.chooseAddress({
//         success:(res1)=>{
//           console.log(res1)
//         }
//       })
//     }else{
//       wx.openSetting({
//         success:(res2)=>{
//           wx.chooseAddress({
//             success:(res3)=>{
//               console.log(res3)
//             }
//           })
//         }
//       })
//     }
//   }
// })
},
handleChange(e){
  const goods_id = e.currentTarget.dataset.id;
   let cart = this.data.cart
  //  let index = cart.findIndex(v=>v.goods_id === goods_id);
  //  cart[index].checked = !cart[index].checked;
    let dataes = cart.find(v=>v.goods_id === goods_id)
    dataes.checked = !dataes.checked
   this.setCart(cart)
},
  setCart(cart){
   let totalPrice = 0;
    let totalNum =0;
    let allChecked =true;
    cart.forEach(v => {
      if(v.checked){
        totalPrice += v.num * v.goods_price;
        totalNum += v.num; 
      }else{
        allChecked =false;
      }
    });
    allChecked = cart.length == 0?false:allChecked;
    this.setData({
      cart,
      totalPrice,
      totalNum,
      allChecked
    })
    wx.setStorageSync('cart', cart)
  },
  handleAllCheck(){
   let {cart,allChecked} = this.data;
   allChecked = !allChecked;
   cart.forEach(v => v.checked = allChecked);
   this.setCart(cart)
  
  },
  async handleNum(e){
    const {operation,id} = e.currentTarget.dataset;
    let cart = this.data.cart;
    const index = cart.findIndex(v => v.goods_id === id);
    if(cart[index].num === 1 && operation === -1){
      // wx.showModal({
      //   title:"提示",
      //   content:"是否移除当前商品",
      //   success:(res)=>{
      //     if(res.confirm){
      //       cart.splice(index,1);
      //       this.setCart(cart);
      //     }
      //   }
      // })
    
      const res = await showModal({content:"是否删除该商品？"}); 
      if(res.confirm){
        cart.splice(index,1);
        this.setCart(cart);
      }
      }else{
        cart[index].num += operation;
        this.setCart(cart)
      }
    },
    async handlePay(){
    const address = this.data.address;
    const totalNum = this.data.totalNum;
     if(!address.userName){
         await showToast({title:"您还没有选择收货地址"});
         return;
     }
     if(totalNum === 0){
       await showToast({title:"您还没有选购商品"});
       return 
     }
     wx.navigateTo({
       url: '/pages/pay/index'
     })
    }
  

})