// 购物车模块

export default {
	// 开启命名空间
	namespaced:true,
	
	// state 数据
	state: () => ({
	    // 购物车的数组，用来存储购物车中每个商品的信息对象
	    // 每个商品的信息对象，都包含如下 6 个属性：
	    // { goods_id, goods_name, goods_price, goods_count, goods_small_logo, goods_state }
	    // cart: [],
		
		//初次加载调用
		cart:JSON.parse(uni.getStorageSync('cart') || '[]' )
		
	  }),
	
	//模块方法
	mutations:{
		addToCart(state,goods){
		 const findResult	= state.cart.find( x=> x.goods_id === goods.goods_id )
		 console.log(findResult);
		 if(!findResult){
			 state.cart.push(goods)
		 }else{
			 findResult.goods_count++
		 }
		 // console.log(state.cart)
		 
		// 通过commit方法调用 m_cart命名空间下的saveToStorage方法
		this.commit('m_cart/saveToStorage') 
		 
		},
		
		// 持久化存储
		saveToStorage(state){
			uni.setStorageSync('cart',JSON.stringify(state.cart))
		},
		
		//勾选状态更改
		updateGoodsState(state,goods){
			const findResult = state.cart.find( x=>x.goods_id ===goods.goods_id )
			
			//有对应的商品信息
			if(findResult){
				//更新
				findResult.goods_state = goods.goods_state
				//持久存储
				this.commit('m_cart/saveToStorage')
			}
		},
		
		//更新商品数量
		updateGoodsCount(state,goods){
			const findResult = state.cart.find( x=>x.goods_id ===goods.goods_id )
			
			//有对应的商品信息
			if(findResult){
				//更新数量
				findResult.goods_count = goods.goods_count
				//持久化存储
				this.commit('m_cart/saveToStorage')
			}
		},
		
		// 删除商品
		removeGoodsId(state,goods_id){
			//调用数组过滤
			state.cart = state.cart.filter( x => x.goods_id !== goods_id)
			// 持续化存储
			this.commit('m_cart/saveToStorage')
		},
		
		// 更新勾选
		// 更新所有商品的勾选状态
		updateAllGoodsState(state, newState) {
		  // 循环更新购物车中每件商品的勾选状态
		  state.cart.forEach(x => x.goods_state = newState)
		  // 持久化存储到本地
		  this.commit('m_cart/saveToStorage')
		},
		
		
		
		
	},
	
	// 模块属性
	getters:{
		total(state){
			// let c = 0
			// 循环统计商品的数量，累加到变量c中
			// state.cart.forEach( goods => c += goods.goods_count )
			// return c
			
			return state.cart.reduce((total,item)=>total+=item.goods_count,0)
		},
		
		// 勾选总数
		checkedCount(state){
			// reduce累加器数量
			return state.cart.filter(x => x.goods_state).reduce((total, item) => total += item.goods_count, 0)
		},
		
		// 总价格计算
		checkedGoodsAmount(state) {
		  // 先使用 filter 方法，从购物车中过滤器已勾选的商品
		  // 再使用 reduce 方法，将已勾选的商品数量 * 单价之后，进行累加
		  // reduce() 的返回值就是已勾选的商品的总价
		  // 最后调用 toFixed(2) 方法，保留两位小数
		  return state.cart.filter(x => x.goods_state)
		                   .reduce((total, item) => total += item.goods_count * item.goods_price, 0)
		                   .toFixed(2)
		}
		
	}
	
}

