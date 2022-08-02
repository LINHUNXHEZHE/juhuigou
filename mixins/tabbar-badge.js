// 设置数字徽标封装成 mixins

//导入
import { mapGetters } from 'vuex'

export default {
	computed: {
		...mapGetters('m_cart', ['total'])
	},
	data() {
		return {

		};
	},
	onShow() {
		//渲染徽标
		this.setBadge()
	},
	methods: {
		setBadge() {
			uni.setTabBarBadge({
				index: 2, //tabBar索引
				text: '' + this.total  //text必须是字符串，加''
			})
		}
	}
}


