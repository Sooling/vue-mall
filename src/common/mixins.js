export const BackTopMixin = {
	data() {
		return {
			isShowBack: false
		}
	},
	methods: {
		backClick: function() {
			this.$refs.scroll.backTo(0,0);
		}
	},
	// components: {
	// 	BackTop
	// }
}