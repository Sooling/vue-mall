<template>
	<div class="tab-control">
		<div class="tab-control-item" 
		v-for="(item,index) in list" 
		:key="index"
		:class="{active: index === currentIndex}"
		@click="itemClick(index)">
			<span>{{item}}</span>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'TabControl',
		data() {
			return {
				list: this.title,
				currentIndex: 0
			}
		},
		props: {
			title: {
				type: Array,
				default() {
					return []
				}
			}
		},
		methods: {
			itemClick: function(index){
				this.currentIndex = index;
				this.$emit('tabClick',index);
			}
		}
	}
</script>

<style scoped="scoped">
	.tab-control{
		display: flex;
		text-align: center;
		font-size: 14px;
		height: 40px;
		line-height: 40px;
	}
	.tab-control-item{
		flex: 1;
	}
	.active span{
		color: var(--color-high-text);
		border-bottom: 3px solid var(--color-high-text);
		padding-bottom: 5px;
	}
</style>
