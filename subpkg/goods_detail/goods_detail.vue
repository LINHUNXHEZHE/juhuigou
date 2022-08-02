<template>
	<view v-if="goods_info.goods_name">
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
			<swiper-item v-for="(item, i) in goods_info.pics" :key="i">
				<image :src="item.pics_big" @click="preview(i)"></image>
			</swiper-item>
		</swiper>
		<!-- 商品信息区域 -->
		<view class="goods-info-box">
			<!-- 商品价格 -->
			<view class="price">￥{{goods_info.goods_price}}</view>
			<!-- 信息主体区域 -->
			<view class="goods-info-body">
				<!-- 商品名称 -->
				<view class="goods-name">{{goods_info.goods_name}}</view>
				<!-- 收藏 -->
				<view class="favi">
					<uni-icons type="star" size="18" color="gray"></uni-icons>
					<text>收藏</text>
				</view>
			</view>
			<!-- 运费 -->
			<view class="yf">快递：免运费</view>
		</view>
		<!-- 商品详情信息 -->
		<rich-text :nodes="goods_info.goods_introduce"></rich-text>

		<!-- fill 控制右侧按钮的样式 -->
		<!-- options 左侧按钮的配置项 -->
		<!-- buttonGroup 右侧按钮的配置项 -->
		<!-- click 左侧按钮的点击事件处理函数 -->
		<!-- buttonClick 右侧按钮的点击事件处理函数 -->
		<view class="goods_nav">
			<uni-goods-nav :fill="true" :options="options" :buttonGroup="buttonGroup" @click="onClick" @buttonClick="buttonClick" />
		</view>
	</view>

</template>

<script>
	//引入
	import { mapMutations,mapGetters } from 'vuex'
		
	export default {
		computed:{
			// 映射数据
			...mapGetters('m_cart',['total'])
		},
		
		watch:{
			// total(newVal){
			// 	const findResult = this.options.find(x => x.text === '购物车')
			// 	if(findResult){
			// 		findResult.info = newVal
			// 	}
			// }
			
			
			total:{
				handler(newVal){
				const findResult = this.options.find(x => x.text === '购物车')
				if(findResult){
					findResult.info = newVal
					}
				},
				// immediate 属性用来声明此侦听器，是否在页面初次加载完毕后立即调用
				immediate:true
			}
			
			
		},
		data() {
			return {
				// 商品详情对象
				goods_info: {
					
				},
				// 左侧按钮组的配置对象
				options: [{
					icon: 'shop',
					text: '店铺'
				}, {
					icon: 'cart',
					text: '购物车',
					info: 0
				}],
				// 右侧按钮组的配置对象
				buttonGroup: [{
						text: '加入购物车',
						backgroundColor: '#ff0000',
						color: '#fff'
					},
					{
						text: '立即购买',
						backgroundColor: '#ffa200',
						color: '#fff'
					}
				]
			};
		},
		
		onLoad(options) {
			// console.log(options);
			const goods_id = options.goods_id
			//详情信息请求
			this.toGoodsDetail(goods_id);
		},
		
		
		methods: {
			// 映射方法
			...mapMutations('m_cart',['addToCart']),
			
			async toGoodsDetail(goods_id) {
				const {data: res} = await uni.$http.get('/api/goods/detail', {goods_id})
				// console.log(res.pics)

				// if (res.meta.status !== 200) return uni.$showMsg()
				// this.goods_info = res
				// console.log(this.goods_info)

				// 使用字符串的 replace() 方法，为 img 标签添加行内的 style 样式，从而解决图片底部空白间隙的问题
				res.goods_introduce = res.goods_introduce.replace(/<img /g, '<img style="display:block;" ')
				// console.log(res.goods_introduce)
				this.goods_info = res
				// console.log(res)
			},
			preview(i) {
				// console.log(i)
				//调用 previewImage() 方法预览图片
				uni.previewImage({
					//预览 默认图标索引
					current: i,
					urls: this.goods_info.pics.map(x => x.pics_big)
				})
			},

			// 左边按钮
			onClick(e) {
				// console.log(e.content.text);
				if(e.content.text === '购物车'){
					uni.switchTab({
						url:'/pages/cart/cart'
					})
				}
			},
			buttonClick(e) {
				// console.log(e);
				if(e.content.text === '加入购物车'){
					//收集商品信息
					const goods = {
						goods_id : this.goods_info.goods_id,
						goods_name : this.goods_info.goods_name,
						goods_price : this.goods_info.goods_price,
						goods_sImg : this.goods_info.pics[0].pics_big,
						goods_count: 1,
						goods_state:true
					}
					// console.log(goods)
					
					//调用addToCart方法( 参：goods )
					this.addToCart(goods);
					
				}
				
			}

		}
	}
</script>

<style lang="scss">
	swiper {
		height: 750rpx;

		image {
			width: 100%;
			height: 100%;
		}
	}

	// 商品信息区域的样式
	.goods-info-box {
		padding: 10px;
		padding-right: 0;

		.price {
			color: #c00000;
			font-size: 18px;
			margin: 10px 0;
		}

		.goods-info-body {
			display: flex;
			justify-content: space-between;

			.goods-name {
				font-size: 13px;
				padding-right: 10px;
			}

			// 收藏区域
			.favi {
				width: 120px;
				font-size: 12px;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				border-left: 1px solid #efefef;
				color: gray;
			}
		}

		// 运费
		.yf {
			margin: 10px 0;
			font-size: 12px;
			color: gray;
		}
	}

	.goods-detail-container {
		// 给页面外层的容器，添加 50px 的内padding，
		// 防止页面内容被底部的商品导航组件遮盖
		padding-bottom: 50px;
	}

	.goods_nav {
		// 为商品导航组件添加固定定位
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
	}
</style>
