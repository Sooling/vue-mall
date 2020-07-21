<template>	
	<div id="home_recommend">
		<div v-for="(item,index) in list" :key="index" class="recommend-item">
				<a :href="item.link" style="display: block;">
					<img :src="item.image" :alt="item.title">
					<div>{{item.title}}</div>
				</a>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'HomeRecommend',
		data() {
			return {
				list: this.recommend_list
			}
		},
		props: {
			recommend_list: {
				type: Array
			}
		}
	}
</script>

<style scoped="scoped">
	#home_recommend{
		width: 100%;
		display: flex;
		padding: 10px 0 20px;
		border-bottom: 8px solid #eee;
	}
	.recommend-item{
		flex: 1;
		text-align: center;
		font-size: 12px;
	}
	.recommend-item img{
		width: 65px;
		height: 65px;
		margin-bottom: 8px;
	}
</style>
