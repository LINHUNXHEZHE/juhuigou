<template>
	<view>
		<!-- 搜索组件 -->
		<view class="search-box" >
			<mySearch @click="toSearch"></mySearch>
		</view>
		
		<!-- banner -->
		<swiper :indicator-dots="true" indicator-color="white" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
			<swiper-item v-for="item in swiperList" :key="item.id">
				<navigator class="swiper-item" :url="'/subpkg/goods_detail/goods_detail?goods_id='+item.goods_id">
					<image :src="item.imgUrl" mode="widthFix"></image>
				</navigator>
			</swiper-item>
		</swiper>

		<!-- nav -->
		<view class="nav-list">
			<view class="nav-item" v-for="item in navList" :key="nav_id">
				<image :src="item.imgUrl" mode=""></image>
				<text>{{item.title}}</text>
			</view>
		</view>
		<view class="clearfix"></view>

		<!-- content -->
		<view class="content">
			<view class="content-item" v-for="(item,i) in content" :key="i">
				<text>{{item.theme}}</text>
				<view class="content-list">
					<!-- left -->
					<navigator class="content-left" :url="item.projectList[0].url"> 
						<image :src="item.projectList[0].imgUrl"></image>					
					</navigator>
					<!-- right -->
					<view class="content-right">
						<view class="content-right-item" >
							<navigator class="right-item" v-for="(item,i2) in item.projectList" :key="i2" v-if="i2 !== 0" :url="item.url">
								<image :src="item.imgUrl"></image>
							</navigator> 
					</view>
				</view>
			</view>
		</view>
	</view>
	</view>
</template>

<script>
	//导入
	import badgeMix from '@/mixins/tabbar-badge.js'
	
	export default {
		mixins:[badgeMix],
		data() {
			return {
				//  banner 定义一个空数组进行接收轮播图数据
				swiperList: [],
				// nav 定义空数组接收导航数据
				navList: [],
				//content 定义空数组接受内容数据
				content: []
			}
		},
		onLoad() {
			// 获取轮播数据
			this.getSwiperList()
			// 获取导航数据
			this.getNavList()
			//获取内容数据
			this.getContent()
		},
		methods: {
			// 获取轮播图的方法
			async getSwiperList() {
				// 发起请求
				const {
					data: res
				} = await uni.$http.get('/api/swiperList')
				// console.log(res);
				// 请求失败
				// if (res.meta.status !== 200) {
				// 	return uni.showToast({
				// 	  title: '数据请求失败！',
				// 	  duration: 1500,
				// 	  icon: 'none',
				// 	})
				// }	
				if (res.meta.status !== 200) return uni.$showMsg()
				// 请求成功，为data数据赋值
				// uni.$showMsg('sucess');
				this.swiperList = res.swiperList
			},

			// 获取导航数据方法
			async getNavList() {
				const {
					data: res
				} = await uni.$http.get('/api/navList')
				// console.log(res.navList);	
				// 请求成功，为data数据赋值
				if (res.meta.status !== 200) return uni.$showMsg()
				this.navList = res.navList
			},

			//获取内容数据方法
			async getContent() {
				const {
					data: res
				} = await uni.$http.get('/api/content')
				// console.log(res.content);
				// 请求成功，为data数据赋值
				if (res.meta.status !== 200) return uni.$showMsg()
				
				// 通过双层 forEach 循环，处理 URL 地址
				  res.content.forEach(floor => {
					  // console.log(floor);
				    floor.projectList.forEach(prod => {
						prod.url = '/subpkg/goods_list/goods_list?'+prod.navigator_url.split('?')[1]
				    })
				  })
			  
				this.content = res.content
			},
			
			toSearch(){
				uni.navigateTo({
					url:'/subpkg/search/search'
				})
			}
			

		}
	}
</script>

<style>
	/* search */
	.search-box{
		/* 吸顶 */
		position: sticky;
		top:0;
		/* 提高阶层，防止覆盖 */
		z-index:999;
	}
	
	/* swiper */
	swiper {
		height: 360rpx;
	}

	.swiper-item {
		width: 100%;
		/* width: 90%; */
		/* margin: 0 auto; */
	}

	.swiper-item image {
		width: 100%;
		height: 100%;
		/* border-radius: 20rpx; */
	}

	/* nav */
	.nav-list {
		margin-top: 20rpx;
		width: 100%;
	}

	.nav-item {
		float: left;
		width: 25%;
		height: 180rpx;
		text-align: center;
	}

	.nav-item image {
		width: 100rpx;
		height: 100rpx;
	}

	.nav-item text {
		float: left;
		width: 187.5rpx;
		text-align: center;
		font-size: 30rpx;
	}

	.clearfix {
		clear: both;
	}

	/*  */
	.content {
		margin-top: 2rpx;
	}

	.content .content-item {
		width: 90%;
		margin: 0 auto;
	}

	.content .content-item text {
		padding-left: 10rpx;
		border-left: 10rpx solid #74EEFD;
	}
	.content-list{
		display: flex;
		padding: 10rpx 0rpx;
	}
	.content-left{
		width:30%;
		height: 300rpx;
		background-color: #007AFF;
	}
	.content-left image{
		width: 100%;
		height: 100%;
	}
	.content-right{
		width: 70%;
		height: 300rpx;
		margin-left: 30rpx;
		/* background-color: #007AFF; */
	}
	.content-right-item{
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
	}
	.right-item{
		margin-bottom: 10rpx;
		width: 48%;
		height: 145rpx;
		background-color: red;
	}
	.right-item image{
		width: 100%;
		height: 100%;
	}
</style>
