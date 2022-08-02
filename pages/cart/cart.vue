<template>
	<view>
		<view v-if="cart.length !== 0">
				<!-- 收获地址 -->
			<myAddress></myAddress>
			
			<!-- 购物车商品列表的标题区域 -->
			<view class="cart-title">
				<!-- 左侧的图标 -->
				<uni-icons type="shop" size="18"></uni-icons>
				<!-- 描述文本 -->
				<text class="cart-title-text">购物车</text>
			</view>
			<uni-swipe-action>
				<block v-for="(goods, i) in cart" :key="i">
					<uni-swipe-action-item :right-options="options" @click="swiperActionClick(goods)">
						<myGoods :goods="goods" :showRadio="true" :showNum="true"  @radio-change="radioChangeHandler" @num-change="numChangeHandler"></myGoods>
					</uni-swipe-action-item>
				</block>
			</uni-swipe-action>
			
			<!-- 结算 -->
			<view class="cart-container ">
				<mySettle></mySettle>
			</view>
		</view>
		
		
		 <!-- 空白购物车区域 -->
		  <view class="empty-cart" v-else>
		    <image src="https://img2.baidu.com/it/u=585232827,3028551137&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500" class="empty-img"></image>
		    <text class="tip-text">空空如也~</text>
		  </view>
		
	</view>
</template>

<script>
	//导入
	import badgeMix from '@/mixins/tabbar-badge.js'
	import {
		mapState,mapMutations
	} from 'vuex'

	export default {
		mixins: [badgeMix],
		computed: {
			...mapState('m_cart', ['cart'])
		},
		onLoad() {
			console.log(this.cart)
		},
		data() {
			return {
				options:[
				        {
				            text: '刪除',
				            style: {
				                backgroundColor: '#c00000'
				            }
				        }
				      ]
			};
		},
		methods:{
			...mapMutations('m_cart',['updateGoodsState','updateGoodsCount','removeGoodsId']),	
			
			
			//勾选状态变化
			radioChangeHandler(e){
				// console.log(e)
				this.updateGoodsState(e)
			},
			// 商品数量变化
			numChangeHandler(e){
				// console.log(e)
				// 执行更新
				this.updateGoodsCount(e)
			},
			//组件滑动 
			swiperActionClick(goods){
				// console.log(goods);
				this.removeGoodsId(goods.goods_id)
				//更新底部徽标
				this.setBadge()
			},
			
		}
	}
</script>

<style lang="scss">
	.cart-title {
		height: 40px;
		display: flex;
		align-items: center;
		font-size: 14px;
		padding-left: 5px;
		border-bottom: 1px solid #efefef;

		.cart-title-text {
			margin-left: 10px;
		}
	}
	.cart-container {
	  padding-bottom: 50px;
	}
	
	.empty-cart {
	  display: flex;
	  flex-direction: column;
	  align-items: center;
	  padding-top: 150px;
	
	  .empty-img {
	    width: 90px;
	    height: 90px;
	  }
	
	  .tip-text {
	    font-size: 12px;
	    color: gray;
	    margin-top: 15px;
	  }
	}
</style>
