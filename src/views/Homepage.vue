<template>
    <div id="homepage">
				<!-- NavBar标签的class属性添加到了NavBar组件的根标签 -->
        <NavBar class="home-nav"><div slot="center">购物街</div></NavBar>	
							
				<TabControl
				class="home_control" 
				:title="home_title" 
				@tabClick="tabClick"
				ref="tabControl_2"
				v-show="isShowControl"/>
				
				<Scroll 
				class="home-wrapper" 
				ref="scroll" 
				:probeType="3"
				@scroll="scroll"
				:pullUpLoad="true"
				@loadMore="loadMore">
					<!-- 轮播v-if="banner_list.length>0" -->
					<!-- <Swiper v-if="banner_list.length>0">
						<SwiperItem v-for="(item,index) in banner_list" :key="index">
							<a :href="item.link">
								<img :src="item.image" alt="">
							</a>
						</SwiperItem>
					</Swiper> -->
					<HomeSwiper :banner_list="banner_list" @swiperImgLoad="swiperImgLoad"/>
					<!-- 首页推荐 -->
					<HomeRecommend v-if="recommend_list.length>0" :recommend_list="recommend_list"/>
					
					<FutureView/>
					
					<TabControl 
					class="home_control" 
					:title="home_title" 
					@tabClick="tabClick"
					ref="tabControl_1"/>
					
					<GoodList :goods="showGoods"/>
				</Scroll>
				
				<BackTop @click.native="backClick" v-show="isShowBack"/>
    </div>
</template>

<script>
	import NavBar from '@components/common/navbar/NavBar.vue'
	import {getHomeMultidata,getHomeGoods} from '@network/home.js'	
	// 引入首页轮播组件
	// import {Swiper,SwiperItem} from '@components/common/swiper/index.js'
	import HomeSwiper from '@components/content/homeswiper/HomeSwiper.vue'
	
	// 引入首页推荐
	import HomeRecommend from '@components/common/homerecommend/HomeRecommend.vue'
	
	import FutureView from '@components/content/futureview/FutureView.vue'
	
	import TabControl from '@components/content/tabcontrol/TabControl.vue'
	
	import GoodList from '@components/content/goods/good-list.vue'
	
	import Scroll from '@components/common/scroll/Scroll.vue'	
	
	import BackTop from '@components/common/backtop/BackTop.vue'
	import {BackTopMixin} from '@common/mixins.js'
	
	export default {
			name: 'Homepage',
			mixins: [BackTopMixin],
			components: {
				NavBar,
				// Swiper,
				// SwiperItem,
				HomeSwiper,
				HomeRecommend,
				FutureView,
				TabControl,
				GoodList,
				Scroll,
				BackTop
			},
			data() {
				return {
					banner_list: [],
					// dKeyword: null,
					// keywords: null,
					recommend_list: [],
					// 问题在于子组件会被立刻渲染，而此时recommend_list仍然是个空数组
					// 然后recommend_list才被赋予父组件异步请求的数据
					// 为了可以从父组件拿到数据后再渲染
					// 在父组件使用子组件时，设置渲染条件：v-if="recommend_list.length>0"
					// 同样的原理也适用于渲染Swiper组件
					home_title: ['流行','新款','精选'],
					goods: {
						pop: {page: 0,list:[]},
						new: {page: 0,list:[]},
						sell: {page: 0,list:[]}
					},
					currentType: 'pop',
					isShowControl: false,
					controlOffsetTop: 0,
					saveY: 0
				}
			},
			computed: {
				// 若想修改计算属性中的值
				// 
				showGoods(){
					return this.goods[this.currentType].list;
				}
			},
			methods: {
				tabClick: function(index){
					switch (index){
						case 0:
						this.currentType = 'pop'
						break;
						case 1:
						this.currentType = 'new'
						break;
						case 2:
						this.currentType = 'sell'
						break;
						}
					this.$refs.tabControl_1.currentIndex = index;
					this.$refs.tabControl_2.currentIndex = index;
				},
				// 返回顶部
				// backClick: function() {
				// 	this.$refs.scroll.backTo(0,0);
				// },
				// 返回顶部按钮的显示和隐藏
				scroll: function(pos) {
					// console.log(pos);
					this.isShowBack = -(pos.y) > 1000;
					this.isShowControl = -(pos.y) > this.controlOffsetTop;
				},
				swiperImgLoad: function() {
					this.controlOffsetTop = this.$refs.tabControl_1.$el.offsetTop;
				},
				loadMore: function() {
					this.getHomeGoods(this.currentType);
				},
				// 以下是网络相关的请求
				getHomeMultidata: function(){
					getHomeMultidata().then(res => {
						//将获取到的信息拆分并保存起来
						//这些信息可以在控制台的vue develop中查看
						// 为什么要保存起来？
						// 因为js的垃圾回收机制
						// console.log(res);
						// console.log(this);
						this.banner_list = res.data.banner.list;
						// this.dKeyword = res.data.dKeyword;
						// this.keywords = res.data.keywords;
						this.recommend_list = res.data.recommend.list;
						// console.log(this.banner_list);
						// console.log(this.recommend_list);
					}).catch(err => {
						return err;
					})
				},
				getHomeGoods: function(type){
					// 获取page的值，默认加载第一页的数据，即page值为1
					let page = this.goods[type].page + 1;
					getHomeGoods(type,page).then(res => {
						// .push(...res.data.list)
						// ...语法，目的是将获取的数据，这里是一个子数组推入到另一个数组
						// 也就是[1,2,3].push([5,6,7]) 变成 [1,2,3,4,5,6,7]
						// 如果直接复制，就会将之前的数据覆盖掉
						this.goods[type].list.push(...res.data.list);
						
						// 因为要获取第二页的数据，修改原始数据，+=1
						this.goods[type].page += 1;
						this.$refs.scroll.finishPullUp();
					}).catch(err => {
						return err;
					})
				},
				// 防抖函数
				debounce: function(fun,delay){
					let timer = null;					
					return function(){
						if(timer) clearTimeout(timer);
						timer = setTimeout(() => {
							fun.apply(this);
						},delay)
					};
				}
			},			
			created() {
				// created周期函数是比较特殊的，最好不要在内部写业务相关的代码
				// 而是直接调用方法，这样写一目了然
				this.getHomeMultidata(),
				this.getHomeGoods('pop'),
				this.getHomeGoods('new'),
				this.getHomeGoods('sell')
				// this.$bus.$on('itemImgLoad',() => {
				// 不要在created里访问$refs，最好在DOM挂载完成后访问
				// 	this.$refs.scroll.refresh();
				// })
			},
			mounted() {
				const refresh = this.debounce(this.$refs.scroll.refresh,50);
				this.$bus.$on('homeGoodsItemLoad',() => {
					refresh();
				});				
			},
			activated() {
				// this.$refs.scroll.refresh();
				this.$refs.scroll.backTo(0,this.saveY,0);
			},
			deactivated() {
				this.saveY = this.$refs.scroll.getSaveY();
				// console.log(this.saveY);
			}
	}
</script>

<style scoped>
	#homepage{
		/* padding-top: 44px; */
		height: 100vh;
		position: relative;
	}
	.home-nav{
		background-color: var(--color-tint);
		color: var(--color-background);
		/* position: fixed;
		top: 0;
		z-index: 2; */
	}
	.home-wrapper{
		position: absolute;
		top: 44px;
		bottom: 49px;
		right: 0;
		left: 0;
		overflow: hidden;
	}
	.home_control{
		background-color: var(--color-background);
		/* position: sticky;
		top: 44px; */
		position: relative;
		z-index: 2;
	}
</style>