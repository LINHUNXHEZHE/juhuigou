<template>
	<view class="goods-list">
		<view v-for="(item,i) in goodsList" :key="i" @click="toDetail(item)">
			<myGoods :goods ="item"></myGoods>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				queryObj:{
					query:'',
					cid:'',
					pageNum:1,
					pageSize:10
				},
				//商品列表
				goodsList:[],
				
				//总数，用于分页
				total:0,
				
				//节流阀
				isLoading:false //请求状态
				
			};
		},
		onLoad(options){	
			// console.log(options);
			this.queryObj.query = options.query || ''
			this.queryObj.cid = options.cid || ''
			// console.log(this.queryObj)
			
			//渲染
			this.getGoodsList();
		},
		methods:{
			
			// 下拉刷新
			onPullDownRefresh(){
				// 重置数据
				this.queryObj.pageNum = 1
				this.total = 0
				this.isLoading = false
				this.goodsList = []
				
				//重新发起请求（重新调用获取商品后要关闭当前的下拉刷新效果）
				this.getGoodsList(()=>uni.stopPullDownRefresh())
			},
			
			// 上拉触底
			onReachBottom(){
				//判断数据是否还有下一页
				if (this.queryObj.pageNum * this.queryObj.pageSize >= this.total) return uni.$showMsg('没有更多了')
				
				//判断是否正在请求数据，是则不再发起
				if(this.isLoading)return
				
				//页码自增 +1
				this.queryObj.pageNum += 1
				//重新获取列表数据
				this.getGoodsList();
			},
			
			async getGoodsList(op){
				//打开节流阀
				this.isLoading = true
				//发起请求
				const {data:res} = await uni.$http.get('/api/search',this.queryObj)
				//关闭节流阀
				this.isLoading = false
				
				//短路运算符 (存在调用)
				op && op()
				
				if(res.meta.status !== 200 )return uni.$showMsg()
				
				// console.log(res)
				// this.goodsList = res.goods	
				
				this.goodsList = [...this.goodsList,...res.goods]
				this.total = res.total
				
			},
			
			
			toDetail(item) {
				// console.log(item.goods_id)
				uni.navigateTo({
					url: '/subpkg/goods_detail/goods_detail?goods_id='+item.goods_id
				})
			}
		}
		
	}
</script>

<style lang="scss">
	
</style>
