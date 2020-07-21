<template>
	<div class="wrapper" ref="wrapper">
		<div class="content">
			<slot></slot>
		</div>
	</div>
</template>

<script>
	import BScroll from '@better-scroll/core';
	import Pullup from '@better-scroll/pull-up';
	BScroll.use(Pullup);
	export default {
		name: 'Scroll',
		data() {
			return {
				scroll: null
			}
		},
		props: {
			probeType: {
				type: Number,
				default() {
					return 0;
				}
			},
			pullUpLoad: {
				type: Boolean,
				default() {
					return false
				}
			}
		},
		methods: {
			// 回到顶部
			backTo: function(x,y,time=300){
				this.scroll.scrollTo(x,y,time);
			},
			refresh: function() {
				// console.log('refresh');
				this.scroll.refresh();
			},
			finishPullUp: function() {
				this.scroll.finishPullUp();
			},
			getSaveY: function() {
				return this.scroll.y;
			}
		},
		mounted() {
			// console.log(this.$refs.wrapper);
			// console.log(document.querySelector('.content').offsetHeight);
			// 输出312，better-scroll失效的原因是slot里的标签并没有完全渲染出来，高度不够
			// console.log(this.$refs.wrapper);
			// console.log(this.prodeType);
			this.scroll = new BScroll(this.$refs.wrapper,{
				probeType: this.probeType,
				pullUpLoad: this.pullUpLoad,
				click: true,
				useTransition: false
			});
			// console.log(this.scroll);
			this.scroll.on('scroll',(pos) => {
				this.$emit('scroll',pos);
			});
			
			if(this.pullUpLoad){
				this.scroll.on('pullingUp',() => {
					this.$emit('loadMore');
				});
			}
		}
	}
</script>

<style scoped="scoped">
</style>
