import {login} from "../../utils/asyncWx.js"
import {request} from "../../request/home.js"
Page({
 async handleGetUserInfo(e){
  try {
    const {encryptedData,rawData,iv,signature} = e.detail
    const {code} = await login()
    const loginParams = {encryptedData,rawData,iv,signature,code};
     const res = await request({url:"/users/wxlogin",data:loginParams,method:"post"});
    //  wx.setStorageSync('token', res.statusCode);
    res.statusCode ="Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo",
    wx.setStorageSync('token', res.statusCode);
     wx.navigateBack({
       delta:1
     })
  } catch (error) {
    console.log(error)
  }
}

})