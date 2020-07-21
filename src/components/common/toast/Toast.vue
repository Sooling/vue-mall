<template>
	<div class="toast" v-show="isShow">
		{{toastMess}}
	</div>
</template>

<script>
	export default {
		name: 'Toast',
		// props: {
		// 	toastMess: {
		// 		type: String,
		// 		default() {
		// 			return ''
		// 		}
		// 	},
		// 	isShow: {
		// 		type: Boolean,
		// 		default() {
		// 			return false
		// 		}
		// 	}
		// }
		data() {
			return {
				toastMess: '',
				isShow: false
			}
		},
		methods: {
			// 在组件中使用插件时：
			// this.$toast.toastShow('hello',1500);
			toastShow: function(mes,dura) {
				this.toastMess = mes;
				this.isShow = true;
				
				setTimeout(() => {
					this.isShow = false;
					this.toastMess = null;
				},dura);
			}
		}
	}
</script>

<style scoped="scoped">
	.toast{
		position: fixed;
		left: 50%;
		top: 50%;
		transform: translate(-50%,-50%);
		background-color: rgba(0,0,0,.6);
		color: #FFFFFF;
		padding: 8px 10px;
		border-radius: 5px;
		z-index: 2;
	}
</style>
