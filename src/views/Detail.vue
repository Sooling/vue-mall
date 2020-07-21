<template>
	<div id="detail">
		<!-- 详情页NavBar -->
		<DetailBar @titleClick="titleClick" ref="bar"/>
		<Scroll 
		class="detail-wrapper" 
		ref="scroll"
		:probeType="3"
		@scroll="detailScroll">
			<!-- 轮播图 -->
			<Swiper v-if="topImages.length>0" class="detail-swiper">
				<SwiperItem v-for="(item,index) in topImages" :key="index">
					<img :src="item" alt="" @load="swiperLoad">
				</SwiperItem>
			</Swiper>
			<!-- 商品信息 -->
			<DetailBaseInfo ref="base" :goods="goods"/>
			<!-- 店铺信息 -->
			<DetailShopInfo :shop="shop"/>
			<!-- 商品详细图片信息 -->
			<DetailGoodsInfo :detailInfo="detailInfo" @imagesLoad="imagesLoad"/>
			<!-- 商品参数 -->
			<DetailParamInfo ref="param" :paramInfo="paramInfo"/>
			<!-- 评论信息 -->
			<DetailCommentInfo 
			:commentInfo="commentInfo"
			ref="comment"/>
			
			<GoodList ref="good" :goods="recommend"/>
		</Scroll>
		<DetailBottomBar @addToCart="addToCart"/>
		<BackTop @click.native="backClick" v-show="isShowBack"/>
		<!-- <Toast :toastMess="toastMess" :isShow="isShow"/> -->
	</div>	
</template>

<script>
	import {getDetail,getRecommend,Goods,Shop,GoodsParam} from '@network/detail.js'
	import {BackTopMixin} from '@common/mixins.js'
	
	import DetailBar from '@components/content/detailbar/DetailBar.vue'	
	import DetailBaseInfo from '@components/content/detailbaseinfo/DetailBaseInfo.vue'
	import DetailShopInfo from '@components/content/detailshopinfo/DetailShopInfo.vue'	
	import DetailGoodsInfo from '@components/content/detailgoodsinfo/DetailGoodsInfo.vue'
	import DetailParamInfo from '@components/content/detailparaminfo/DetailParamInfo.vue'
	import DetailCommentInfo from '@components/content/detailcommentinfo/DetailCommentInfo.vue'
	import DetailBottomBar from '@components/content/detailbottombar/DetailBottomBar.vue'
	// import Toast from '@components/common/toast/Toast.vue'
	
	import {Swiper,SwiperItem} from '@components/common/swiper/index.js'	
	import Scroll from '@components/common/scroll/Scroll.vue'
	import GoodList from '@components/content/goods/good-list.vue'
	import BackTop from '@components/common/backtop/BackTop.vue'
	
	export default {
		name: 'Detail',
		mixins: [BackTopMixin],
		data() {
			return {
				iid: '',
				topImages: [],
				// goods: null
				// 这样写会在DetailBaseInfo.vue报错
				// Cannot convert undefined or null to object
				goods: {},
				shop: {},
				detailInfo: {},
				paramInfo: {},
				commentInfo: {},
				recommend: [],
				cmpsPosY: [],
				toastMess: '',
				initialIndex: 0,
				isSwiper: false,
				isGoodsInfo: false,
				isRecommend: false
				// isShow: false
			}
		},
		components: {
			DetailBar,
			Swiper,
			SwiperItem,
			DetailBaseInfo,
			DetailShopInfo,
			Scroll,
			DetailGoodsInfo,
			DetailParamInfo,
			DetailCommentInfo,
			GoodList,
			BackTop,
			DetailBottomBar
			// Toast
		},
		created() {
			this.iid = this.$route.params.iid;
			getDetail(this.iid).then(res => {
				const result = res.result;
				// console.log(result);
				this.topImages = result.itemInfo.topImages;
				
				// 创建实例化对象并传入参数
				this.goods = new Goods(result.itemInfo,result.columns,result.shopInfo);
				
				// 获取店铺信息
				this.shop = new Shop(result.shopInfo);
				
				// 获取展示页面的描述信息
				this.detailInfo = result.detailInfo;
				// console.log(this.detailInfo)
				// 获取参数信息
				this.paramInfo = new GoodsParam(result.itemParams.info,result.itemParams.rule);
				
				// 获取评论信息
				this.commentInfo = result.rate.list[0];
			}).catch(err => {
				return err;
			});
			getRecommend().then(res => {
				this.recommend = res.data.list;
				// console.log(this.recommend);
			}).catch(err => {
				return err;
			})
		},
		methods: {
			titleClick: function(index) {
				this.$refs.scroll.backTo(0,-this.cmpsPosY[index],100);
			},
			swiperLoad: function() {
				if(!this.isSwiper){
					this.isSwiper = true;
					this.refresh();					
				}								
			},
			imagesLoad: function() {
				// console.log('success');
				// this.$refs.scroll.refresh();
				this.isGoodsInfo = true;
				this.refresh();
			},
			// backClick: function() {
			// 	this.$refs.scroll.backTo(0,0);
			// },
			debounce: function(delay){
				let timer = null;	
				const _this = this;
				return function(){
					if(timer) clearTimeout(timer);
					timer = setTimeout(() => {
						// fun.apply(this);
						_this.isRecommend = true;
						_this.refresh();
					},delay)
				};
			},
			refresh: function() {
				if(this.isSwiper && this.isGoodsInfo && this.isRecommend){
					// 加if判断
					// 否则从首页切换回详情页时，会出现this.$refs.scroll不存在的bug
					// 原因在于：this.$refs只有在html元素或组件挂载完成之后才能拿得到
					if(this.$refs.scroll){
						this.$refs.scroll.refresh();
						this.cmpsPosY.push(0);
						this.cmpsPosY.push(this.$refs.param.$el.offsetTop);
						this.cmpsPosY.push(this.$refs.comment.$el.offsetTop);
						this.cmpsPosY.push(this.$refs.good.$el.offsetTop);
						// this.cmpsPosY.push(Number.MAX_VALUE);
						// console.log('loaded')
						// console.log(this.cmpsPosY)
					}							
				}
			},
			detailScroll: function(pos) {
				const posY = -pos.y;
				this.isShowBack = posY > 1000;
				
				if(this.initialIndex !== 0 && posY >= 0 && posY < this.cmpsPosY[1]){
					this.$refs.bar.currentIndex = 0;
					this.initialIndex = 0;
					// console.log(0);
				}else if(this.initialIndex !== 1 && posY >= this.cmpsPosY[1] && posY < this.cmpsPosY[2]){
					this.$refs.bar.currentIndex = 1;
					this.initialIndex = 1;
					// console.log(1);
				}else if(this.initialIndex !== 2 && posY >= this.cmpsPosY[2] && posY < this.cmpsPosY[3]){
					this.$refs.bar.currentIndex = 2;
					this.initialIndex = 2;
				}else if(this.initialIndex !== 3 && posY >= this.cmpsPosY[3]){
					this.$refs.bar.currentIndex = 3;
					this.initialIndex = 3;
				}
			},
			addToCart: function() {
				// 1.创建对象
				const obj = {}
				// 2.对象信息
				obj.iid = this.iid;
				obj.imgURL = this.topImages[0];
				obj.title = this.goods.title;
				obj.desc = this.goods.desc;
				obj.newPrice = this.goods.nowPrice;
				// this.$store.commit('addToCart',obj);
				// 如何判断加入购物车成功？
				// 在actions中使用Promise
				this.$store.dispatch('addToCart',obj).then(res => {
					this.$toast.toastShow(res,1500);
				});
			}
		},
		mounted() {
			const refresh = this.debounce(50);
			this.$bus.$on('detailGoodsItemLoad',() => {				
				refresh();
			});				
		}
	}
</script>

<style scoped="scoped">
	#detail{
		position: relative;
		z-index: 2;
		background-color: #FFFFFF;
		height: 100vh;
	}
	.detail-swiper{
		/* 这里使用的图片高度较大，设置300px限制高度 */
		height: 300px;
	}
	.detail-wrapper{
		position: absolute;
		top: 44px;
		bottom: 58px;
		right: 0;
		left: 0;
		overflow: hidden;
	}
</style>
