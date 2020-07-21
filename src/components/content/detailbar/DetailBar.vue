<template>
	<NavBar>
		<div 
		slot="left" 
		class="detail-left"
		@click="backClick">
			<img src="@img/common/back.svg" alt="">
		</div>
		
		<div slot="center" class="detail-center">
			<div 
			v-for="(item,index) in detail_list" 
			:key="index"
			:class="{active: currentIndex === index}"
			@click="listClick(index)">
				{{item}}
			</div>
		</div>
	</NavBar>
</template>

<script>
	import NavBar from '@components/common/navbar/NavBar.vue'
	export default {
		name: 'DetailBar',
		data() {
			return {
				detail_list: ['商品','参数','评论','推荐'],
				currentIndex: 0
			}
		},
		components: {
			NavBar
		},
		methods: {
			listClick: function(index) {
				this.$emit('titleClick',index);
				this.currentIndex = index;
			},
			backClick: function() {
				// 在手机端，replace即可
				this.$router.replace('/homepage');
			}
		}
	}
</script>

<style scoped="scoped">
	.detail-center{
		display: flex;
	}
	.detail-center>div{
		flex: 1;
		font-size: 12px;
	}
	.detail-left{
		height: 44px;
	}
	.detail-left>img{
		/* 微调使图片垂直居中 */
		margin-top: 11px;
	}
	.active{
		color: var(--color-high-text);
	}
</style>
