<template>
	<div class="nav-bar">
		<div class="left"><slot name="left"></slot></div>		
		<div class="center"><slot name="center"></slot></div>
		<div class="right"><slot name="right"></slot></div>
	</div>
</template>

<script>
	export default {
		name: 'NavBar'
	} 
</script>

<style scoped="scoped">
	.nav-bar{
		display: flex;
		height: 44px;
		width: 100%;
		line-height: 44px;
		text-align: center;
		box-shadow: 0 1px 10px rgba(100, 100, 100, .1);
	}
	.right,
	.left{
		width: 60px;
	}
	.center{
		flex: 1;
	}
</style>
