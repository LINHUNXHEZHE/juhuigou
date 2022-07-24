<template>
	<view>
		<view class="search-box">
			<uni-icons class="icons" size="20" type="search"></uni-icons>
			<input type="text" class="search-input" placeholder="请输入关键词" @input="changeInput" focus="true">
			<!-- <uni-icons class="close" size="20" type="close" @click="close"></uni-icons>	 -->
		</view>
			
		
		<!-- 搜索历史 -->
		<view v-if="searchResults.length == 0" class="history-box">
			<view class="history-title">
				<text>搜索历史</text>
				<uni-icons type="trash" sizw="18" @click="clearHistory"></uni-icons>
			</view>
			<view class="history-list">
				<view class="history-item" v-for="(item,i) in histories" :key="i" @click="toGoodsList(item)">
					<text>{{item}}</text>
				</view>
			</view>
		</view>
		
		<!-- 搜索列表 -->
		<view v-else class="search-list">
			<view class="search-item" v-for="(item,i) in searchResults" :key="i" @click = toDetail(item.goods_id)>
				<view class="goods_name">{{item.goods_name}}</view>
				<uni-icons type="arrowright" size="16"></uni-icons>
			</view>
		</view>
		
		
		
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				timer:null,
				keyword:'', //关键词
				
				searchResults:[] ,//查询结果数组
				historyList:[],//历史搜索
			};
		},
		
		onload(){
			this.historyList = JSON.parse(uni.getStorageSync('kw') || '[]')
		},
		
		methods:{
			// changeInput(e){
			// 	// console.log(e);
			// 	console.log(e.detail.value);
			// }
			
			// 防抖效果 800毫秒
			
			changeInput(e){
				
				clearTimeout(this.timer)

			 	this.timer= setTimeout(()=>{
					// console.log(e.detail.value)
					this.keyword = e.detail.value
					console.log(this.keyword)
					//调用
					this.getSearchResults();
				},800)
				
			},
			
			async getSearchResults(){
				//判断搜索是否为空
				if(this.keyword.length === 0){
					this.searchResults = []
					return
				}
				//不为空
				const { data : res } = await uni.$http.get('/api/searchResults',{query:this.keyword})
				if(res[0].meta.status !== 200) return uni.$showMsg()
				console.log(res);
				 this.searchResults = res[1];
				// console.log(this.searchResults)
				
				// 调用保存
				this.saveSearchHistory()
			},
			
			toDetail(goods_id){
				// console.log(goods_id);
				uni.navigateTo({
				    // 指定详情页面的 URL 地址，并传递 goods_id 参数
				    url: '/subpkg/goods_detail/goods_detail?goods_id=' + goods_id
				})
			},
			
			saveSearchHistory(){
				// this.historyList.push(this.keyword)
				
				const set = new Set(this.historyList)
				set.delete(this.keyword)
				set.add(this.keyword)
				this.historyList = Array.from(set)
				console.log(this.historyList)
				
				// 对搜索数据的持久化保存（本地）
				uni.setStorageSync('kw', JSON.stringify(this.historyList))
				
			},
				
			//清除搜索历史
			clearHistory(){
				//清空在data中的数据
				this.historyList = []
				//清空在本地存储记录中的搜索
				uni.setStorageSync('kw', '[]')
			},
			
			//跳转页面
			toGoodsList(keywork){
				// console.log(item);
				uni.navigateTo({
					url:'/subpkg/goods_list/goods_list?query='+ keywork
				})
			}
			
				
		},
		computed:{
			histories(){
				// 不直接使用原数组reverse反转
				return [...this.historyList].reverse()
			}
		}
	}
</script>

<style lang="scss">
	.search-box{
		width: 100%;
		height: 38px;
		padding-top: 10rpx;
		background-color: #74EEFD;
		.search-input{
			width: 90%;
			height: 30px;
			margin: 0 auto;
			// border: 2px solid #74EEFD;
			background-color: white;
			border-radius: 18px;
			position: relative;
			font-size: 14px;
			text-align: center;
			color:#333333;
		}
		.icons{
			position: absolute;
			top:9px;
			left:24px;
			z-index: 888;
		}
		.close{
			position: absolute;
			top: 9px;
			right:24px;
			z-index: 788;
		}
	}
	
	.search-list{
		.search-item{
			display: flex;
			font-size: 14px;
			padding: 14px 0;
			border-bottom: 1px solid #efefef;
			align-items: center;
			justify-content: space-between;
			.goods_name{
				text-overflow: ellipsis;
				white-space: nowrap;
				overflow: hidden;
				margin-left: 10px;
				color:#333333;
			}
		}
	}
	
	.history-box{
		  padding: 0 5px;
		.history-title{
			display: flex;	
			justify-content:space-between;
			align-items: center;
			height: 40px;
			font-size: 13px;
			border-bottom: 1px solid #efefef;
		}
	}
	.history-list{
		display: flex;
		flex-wrap: wrap;
		.history-item{
			margin-top: 5px;
			margin-left: 5px;
			
			text{
				text-align: center;
				line-height: 30px;
				padding: 5px 12px;
				background-color: #FAFAFA;
				border-radius: 5px;
			}
			
		}
	}
</style>
