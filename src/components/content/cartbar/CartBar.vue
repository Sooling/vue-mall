<template>
	<NavBar id="cart_bar">
		<div slot="center">
			购物车（{{cartLength}}）
		</div>
	</NavBar>
</template>

<script>
	import NavBar from '@components/common/navbar/NavBar.vue'
	import {mapGetters} from 'vuex'
	
	export default {
		name: 'CartBar',
		components: {
			NavBar
		},
		computed: {
			...mapGetters([
				'cartLength'
			])
		}
	}
</script>

<style scoped="scoped">
	#cart_bar{
		background-color: var(--color-tint);
		color: var(--color-background);
	}
</style>
