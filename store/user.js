export default {
	// 开启命名空间
	namespaced:true,
	
	// state数据
	state:()=>({
		// 收获地址
		// address:{}
		//读取本地数据，初始化
		address:JSON.parse(uni.getStorageSync('address') || '{}'),
		
		// 成功登录 -> token
		token:'',
		
		// 用户的基本信息
		  userinfo: JSON.parse(uni.getStorageSync('userinfo') || '{}')
	}),
	
	
	// mutaions方法
	mutations:{
		// 更新收货地址
		updateAddress(state,address){
			state.address = address
			// 存储
			this.commit('m_user/saveAddressToStorage')
		},
		// 持久化存储
		saveAddressToStorage(state){
			uni.setStorageSync('address',JSON.stringify(state.address))
		},
		// 更新用户的基本信息
		updateUserInfo(state, userinfo) {
			state.userinfo = userinfo
			// 通过 this.commit() 方法，调用 m_user 模块下的 saveUserInfoToStorage 方法，将 userinfo 对象持久化存储到本地
			this.commit('m_user/saveUserInfoToStorage')
		 },
		// 将 userinfo 持久化存储到本地
		saveUserInfoToStorage(state) {
		    uni.setStorageSync('userinfo', JSON.stringify(state.userinfo))
		}
	},
	
	
	// getters包装器
	getters:{
		addStr(){
			if(!this.address.provinceName) return ''
			
			//拼接地址字符串返回
			return this.address.provinceName+this.address.cityName+this.address.countyName+this.address.detailInfo
			
		}
	},
	
}

