<template>
	<view class="bottom">
		  <!-- 选择收货地址的盒子 -->
		  <view class="address-choose-box" v-if="JSON.stringify(address) === '{}'">
		    <button type="primary" size="mini" class="btnChooseAddress" @click="chooseAddress">+ 请选择收货地址</button>
		  </view>
		
		  <!-- 渲染收货信息的盒子 -->
		  <view class="address-info-box" v-else @click="chooseAddress">
		    <view class="row1">
		      <view class="row1-left">
		        <view class="username">收货人:<text>{{address.userName}}</text></view>
		      </view>
		      <view class="row1-right">
		        <view class="phone">电话：<text>{{address.telNumber}}</text></view>
		        <uni-icons type="arrowright" size="16"></uni-icons>
		      </view>
		    </view>
		    <view class="row2">
		      <view class="row2-left">收货地址：</view>
		      <view class="row2-right">{{addStr}}</view>
		    </view>
		  </view>
	</view>
</template>

<script>
	import { mapState, mapMutations,mapGetters } from 'vuex'	
	
	export default {
		name:"myAddress",
		data() {
			return {
				// 收获地址
				// address:{
				// } //移到 user.js
			};
		},
		computed:{
			...mapState('m_user',['address']),
			...mapGetters('m_user',['addStr']),
			
			addStr(){
				if(!this.address.provinceName) return ''
				
				//拼接地址字符串返回
				return this.address.provinceName+this.address.cityName+this.address.countyName+this.address.detailInfo
			}
		},
		methods:{
			...mapMutations('m_user',['updateAddress']),
			
			async chooseAddress(){
				// console.log('click')
				//调用小程序提供的chooseAddress()方法
				const [err,succ] = await uni.chooseAddress().catch(err => err)
				if(succ && succ.errMsg === 'chooseAddress:ok'){
					// 为 data 里面的收货地址对象赋值
					// this.address = succ
					// console.log(succ)
					//更新地址
					this.updateAddress(succ)
					
				}
				// console.log(this.address)			
				
				// 用户没有授权处理
				if(err && err.errMsg === 'chooseAddress:fail auth deny'){
					this.reAuth() // 调用 this.reAuth() 方法，向用户重新发起授权申请
				}
			},
			
			// 授权
			// 检测用户是否打开授权？=>确定->重新调用让用户授权
			//                       取消->提醒用户取消了授权
			async reAuth(){
				// 提示用户授权
				const [err2,confirmResult] = await uni.showModal({
					content:'检测到您没地址授权，是否去设置打开？',
					confirmText:"确认",
					cancelText:"取消"
				})
				
				// 弹窗异常,直接退出
				if(err2) return
				
				//用户点击取消，则提示用户取消授权
				if(confirmResult.cancel) return uni.$showMsg('您取消了地址授权')
				
				//用户点击确定。进入授权
				if (confirmResult.confirm) return uni.openSetting({
					success: (settingResult) => {
					  // 地址授权的值等于 true，提示用户 “授权成功”
					  if (settingResult.authSetting['scope.address']) return uni.$showMsg('授权成功！请选择地址')
					  // 地址授权的值等于 false，提示用户 “取消了地址授权”
					  if (!settingResult.authSetting['scope.address']) return uni.$showMsg('您取消了地址授权！')
					  }
				})
				
			}
			
			
			
			
		}
	}
</script>

<style lang="scss">
	.bottom{
		border-bottom: 1px solid #efefef;
	}
	
	// 选择收货地址的盒子
	.address-choose-box {
	  height: 90px;
	  display: flex;
	  align-items: center;
	  justify-content: center;
	}
	
	// 渲染收货信息的盒子
	.address-info-box {
	  font-size: 12px;
	  height: 90px;
	  display: flex;
	  flex-direction: column;
	  justify-content: center;
	  padding: 0 5px;
	
	  // 第一行
	  .row1 {
	    display: flex;
	    justify-content: space-between;
	
	    .row1-right {
	      display: flex;
	      align-items: center;
	
	      .phone {
	        margin-right: 5px;
	      }
	    }
	  }
	
	  // 第二行
	  .row2 {
	    display: flex;
	    align-items: center;
	    margin-top: 10px;
	
	    .row2-left {
	      white-space: nowrap;
	    }
	  }
	}
</style>