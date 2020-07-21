<template>
	<div class="goods">
		<div class="goods-content">
			<GoodListItem v-for="(item,index) in goods" :key="index" :item='item'/>
		</div>		
	</div>
</template>

<script>
	import GoodListItem from '@components/content/goods/good-list-item.vue'
	export default {
		name: 'GoodList',
		props: {
			goods: {
				type: Array,
				default(){
					return []
				}
			}
		},
		components: {
			GoodListItem
		}
	}
</script>

<style scoped="scoped">
	.goods-content {
		/* 设置flex布局 */
		/* 目的使商品列表每一行均等分布，且剧中 */
		/* 这里是一行显示两个 */
	  display: flex;
	  flex-wrap: wrap;
	  justify-content: space-around;	
	  padding: 2px;
		/* padding-bottom: 49px; */
	}
</style>
