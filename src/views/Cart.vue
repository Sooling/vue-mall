<template>
	<div id="cart">
		<CartBar/>
		<Scroll ref="scroll" class="cart-wrapper">
			<CartList/>
		</Scroll>
		<CartBottomBar></CartBottomBar>
	</div>
</template>

<script>
	import CartBar from '@components/content/cartbar/CartBar.vue'
	import CartList from '@components/content/cartlist/CartList.vue'
	import CartBottomBar from '@components/content/cartbottombar/CartBottomBar.vue'
	
	import Scroll from '@components/common/scroll/Scroll.vue'
	
	export default {
		name: 'Cart',
		components: {
			CartBar,
			CartList,
			Scroll,
			CartBottomBar
		},
		activated() {
			this.$refs.scroll.refresh();
		}
	}
</script>

<style scoped>
	#cart{
		position: relative;
		height: 100vh;
	}
	.cart-wrapper{
		position: absolute;
		top: 44px;
		bottom: 93px;
		right: 0;
		left: 0;
		overflow: hidden;
	}
</style>