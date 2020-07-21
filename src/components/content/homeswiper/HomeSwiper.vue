<template>
	<div>
		<Swiper v-if="banner_list.length>0" class="home-swiper">
			<SwiperItem v-for="(item,index) in banner_list" :key="index">
				<a :href="item.link">
					<img :src="item.image" alt="" @load="swiperImgLoad">
				</a>
			</SwiperItem>
		</Swiper>
	</div>
</template>

<script>
	import {Swiper,SwiperItem} from '@components/common/swiper/index.js'
	export default {
		name: 'HomeSwiper',
		data(){
			return {
				isLoad: false
			}
		},
		props: {
			banner_list: {
				type: Array,
				default() {
					return []
				}
			}
		},
		components: {
			Swiper,
			SwiperItem
		},
		methods: {
			swiperImgLoad: function() {
				if(!this.isLoad){
					this.$emit('swiperImgLoad');
					this.isLoad = true;
				}
			}
		}
	}
</script>

<style scoped="scoped">
</style>
