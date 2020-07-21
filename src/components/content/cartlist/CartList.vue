<template>
	<div>
		<CartListItem 
		v-for="(item,index) in cartList" 
		:key="index" 
		:itemInfo="item"
		:currentIndex="index"/>
	</div>
</template>

<script>
	import {mapGetters} from 'vuex'
	import CartListItem from '../cartlistitem/CartListItem.vue'
	
	export default {
		name: 'CartList',
		computed: {
			...mapGetters([
				'cartList'
			])
		},
		components: {
			CartListItem
		}
	}
</script>

<style scoped="scoped">
</style>
