<template>
	<view class="goods-item">
		<!-- 商品左侧图片区域 -->
		<view class="goods-item-left">
			<radio v-if="showRadio" :checked="goods.goods_state" color="#C00000" @click="radioClick"></radio>
			<image :src="goods.goods_sImg || defaultPic" class="goods-pic"></image>
		</view>
		<!-- 商品右侧信息区域 -->
		<view class="goods-item-right">
			<!-- 商品标题 -->
			<view class="goods-name">{{goods.goods_name}}</view>
			<view class="goods-info-box">
				<!-- 商品价格 -->
				<view class="goods-price">￥{{goods.goods_price | tofixed}}</view>
				<!-- 商品数量 -->
				  <uni-number-box :min="1" :value="goods.goods_count" :showNum="true"  v-if="showNum" @change="numChangeHandler"></uni-number-box>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			goods: {
				type: Object,
				default: {}
			},
			// 是否展示radio
			showRadio:{
				type:Boolean,
				//无指定show-radio属性，则默认不展示
				default:false
			},
			// 是否展示价格右侧的 NumberBox 组件
			    showNum: {
			    type: Boolean,
			    default: false,
		    },
		},
		data() {
			return {
				defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'
			};
		},
		// 过滤器
		filters: {
			//数字处理为带两位小数点的数字
			tofixed(num) {
				return Number(num).toFixed(2)
			}
		},
		methods: {
			radioClick(){
				//
				this.$emit('radio-change',{
					goods_id:this.goods.goods_id,
					goods_state:!this.goods.goods_state
				})
			},
			
			numChangeHandler(val){
				this.$emit('num-change',{
					goods_id:this.goods.goods_id,
					goods_count : + val 
				})
			}
		}

	}
</script>

<style lang="scss">
	.goods-item {
		display: flex;
		padding: 10px 5px;
		border-bottom: 1px solid #f0f0f0;
		  // 让 goods-item 项占满整个屏幕的宽度
		  width: 750rpx;
		  // 设置盒模型为 border-box
		  box-sizing: border-box;

		.goods-item-left {
			margin-right: 5px;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.goods-pic {
				width: 100px;
				height: 100px;
				display: block;
			}
		}

		.goods-item-right {
			display: flex;
			flex:1;
			flex-direction: column;
			justify-content: space-between;

			.goods-name {
				font-size: 13px;
			}
				
			 .goods-info-box {
			    display: flex;
			    align-items: center;
			    justify-content: space-between;
			  }
			
			.goods-price {
				font-size: 16px;
				color: #c00000;
			}
		}
	}
</style>
