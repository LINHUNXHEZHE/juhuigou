<template>
	<view class="search-container" :style="{'background':bgcolor}" @click="searchHandle">
		<view class="search-box" :style="{'border-radius': radius + 'px'}">
			<uni-icons type="search" size="18"></uni-icons>
			<text class="placeholder">搜索</text>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
		  // 背景颜色
		  bgcolor: {
			type: String,
			default: '#74EEFD'
		  },
		  // 圆角尺寸
		  radius: {
			type: Number,
			// 单位是 px
			default: 18
		  }
		},
		data() {
			return {
				
			};
		},
		methods:{
			searchHandle(){
				// console.log('ok');
				this.$emit('click');
			}
		}
	}
</script>

<style lang="scss">
	.search-container {
	  height: 44px;
	  padding: 0 10px;
	  display: flex;
	  align-items: center;
	}
	
	.search-box {
	  height: 30px;
	  background-color: #ffffff;
	  // 移除圆角尺寸，改由 props 属性控制
	  // border-radius: 15px;
	  width: 100%;
	  display: flex;
	  align-items: center;
	  justify-content: center;
	  
	  .placeholder {
	    font-size: 14px;
	    margin-left: 5px;
		column-rule: #C0C0C0;
	  }
	}
</style>
