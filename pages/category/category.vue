<template>
	<view>
		<view class="scroll-container">
				<!-- 左侧滑动 -->
				<scroll-view class="scroll-view-left" scroll-y="true" :style="{height:wh+'px'}">
					<!-- <view class="scroll-left-item active before">test</view> -->
					<block v-for="(item,i) in category" :key="i">
						<view :class="['scroll-left-item',i===active?'active':'']" @click="activeChanged(i)">{{item.c_name}}</view>
					</block>
				</scroll-view>
				<!-- 右侧滚动 -->
				<scroll-view class="scroll-right-item" scroll-y="true" :scroll-top="scrollTop"  :style="{height:wh+'px'}">
					<!-- 二级分类标题 -->
					<view class="sRight-lv2" v-for="(item2,i2) in cateLv2" :key="i2">
						<view class="sRight-item-title">/ {{item2.c_name}} /</view>
						<!-- 三级分类渲染 -->
						<view class="sRight-lv3">
							<view class="sRight-item" v-for="(item3,i3) in item2.children" :key="i3" @click="toGoodsList(item3)">
								<image :src="item3.c_icon"></image>
								<text>{{item3.c_name}}</text>
							</view>
						</view>
					</view>
				</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 当前设备的可用高度
				wh:0,
				// category 定义一个空数组接收数据
				category:[],
				cateLv2:[],
				active:0,
				
				// 滚动条距离顶部
				scrollTop:0
				
			};
		},
		onLoad(){
			const sysInfo = uni.getSystemInfoSync()
			console.log(sysInfo);
			this.wh =  sysInfo.windowHeight
			
			// 调用
			this.getCategory()
		},
		methods:{
			// 获取分类数据
			async getCategory(){
				// 发起请求
				const { data:res } = await uni.$http.get('/api/category')
				if(res.meta.status != 200) return uni.$showMsg()
				// 赋值
				// console.log(res)
				this.category = res.category
				console.log(this.cateLv2)	
				this.cateLv2 = res.category[0].children
			},
			activeChanged(i){
				// console.log(i)
				this.active = i
				this.cateLv2 = this.category[i].children
				
				//
				this.scrollTop = this.scrollTop ? 1 : 0
				
			},
			//点击对应的icon进入商品列表goods_list
			toGoodsList(item3){
				// console.log(item3)
				uni.navigateTo({
					url:'/subpkg/goods_detail/goods_detail?cid='+item3.c_id
				})
				
			}
		}
	}
</script>

<style lang="scss">
	.scroll-container {
	  display: flex;
	
	  .scroll-view-left {
	    width: 120px;
	
	    .scroll-left-item {
	      line-height: 70px;
	      background-color: #f7f7f7;
	      text-align: center;
	      font-size: 12px;
	
	      // 激活项的样式
	      &.active {
	        background-color: #ffffff;
	
	        // 渲染激活项左侧的红色指示边线
	        &::before {
	          background-color: #c00000;
	        }
	      }
	    }
	  }
	}
	.sRight-item-title{
		font-size: 14px;
		font-weight: bold;
		text-align: center;
		padding: 15px 0;
	}
	
	.sRight-lv3{
		display: flex;
		flex-wrap: wrap;
		.sRight-item{
			width: 33.33%;
			margin-bottom: 10px;
			display: flex;
			flex-direction: column;
			align-items: center;
		}
		image{
			width: 60px;
			height: 60px;
		}
		text{
			font-size: 12px;
		}
	}
	
</style>
