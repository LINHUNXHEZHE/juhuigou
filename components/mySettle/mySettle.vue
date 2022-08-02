<template>
	<view>
		<view class="my-settle-container">
			<!-- 全选区域 -->
			<label class="radio" @click="changeAllState">
				<radio color="#C00000" :checked="isFullCheck" /><text>全选</text>
			</label>

			<!-- 合计区域 -->
			<view class="amount-box">
				合计:<text class="amount">￥{{checkedGoodsAmount}}</text>
			</view>

			<!-- 结算-->
			<view class="btn-settle" @click="settlement">结算 ({{checkedCount}}) </view>
		</view>
	</view>
</template>

<script>
	import { mapState,mapGetters,mapMutations } from 'vuex'
	
	export default {
		name: "mySettle",
		data() {
			return {
			};
		},
		
		computed:{
			...mapGetters('m_cart',['checkedCount','total','checkedGoodsAmount']),
			...mapState('m_user',['address']),	
			...mapState('m_user',['token']),	
			
			// 是否全选
			isFullCheck(){
			      return this.total === this.checkedCount
			},
		},
		
		methods:{
			...mapMutations('m_cart',['updateAllGoodsState']),

			
			// label 的点击事件处理函数
			  changeAllState() {
			    // 修改购物车中所有商品的选中状态
			    // !this.isFullCheck 表示：当前全选按钮的状态取反之后，就是最新的勾选状态
			    this.updateAllGoodsState(!this.isFullCheck)
			},
			
			//结算判断
			settlement(){
				// console.log('结算判断');
				
				if(!this.checkedCount)return uni.$showMsg('请选择结算商品!')
				if(!this.address)return uni.$showMsg('请选择收获地址!')
				if (!this.token) return uni.$showMsg('请先登录！')
				// console.log(this.addStr)
				// if(!this.addStr){
				// 	console.log('1')
				// 	console.log(this.addStr)
				// }else{
				// 	console.log('2')
				// }
			}
		}
			
		
	}
</script>

<style lang="scss">
	.my-settle-container {
		/* 底部固定定位 */
		position: fixed;
		bottom: 0;
		left: 0;
		/* 设置宽高和背景色 */
		width: 100%;
		height: 50px;
		background-color: white;
		background-color: white;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-left: 5px;
		font-size: 14px;

		.radio {
			display: flex;
			align-items: center;
		}

		.amount {
			color: #c00000;
		}

		.btn-settle {
			height: 50px;
			min-width: 100px;
			background-color: #c00000;
			color: white;
			line-height: 50px;
			text-align: center;
			padding: 0 10px;
		}
	}
</style>
