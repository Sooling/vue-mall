<template>
	<div class="goods-item" @click="goodsItemClick">
		<img :src="showImg" alt="" @load="imgLoad">
		<div class="goods-info">
			<p>
				{{item.title}}
			</p>
			<span class="price">{{item.price}}</span>
			<span class="collect">{{item.cfav}}</span>
		</div>		
	</div>
</template>

<script>
	export default {
		name: 'GoodListItem',
		props: {
			item: {
				type: Object,
				default(){
					return {}
				}
			}
		},
		computed: {
			showImg() {
				if(this.item.image){
					return this.item.image;
				}else{
					return this.item.show.img
				};
			}
		},
		methods: {
			imgLoad: function() {
				if(this.$route.path.indexOf('/homepage') !== -1){
					this.$bus.$emit('homeGoodsItemLoad');
				}else{
					this.$bus.$emit('detailGoodsItemLoad');
				}		
			},
			goodsItemClick: function() {
				this.$router.push('/detail' + this.item.iid)
			}
		}
	}
</script>

<style scoped="scoped">
	.goods-item {
	  padding-bottom: 40px;
	  position: relative;	
	  width: 48%;
	}
	
	.goods-item img {
	  width: 100%;
	  border-radius: 5px;
	}
	
	.goods-info {
	  font-size: 12px;
	  position: absolute;
	  bottom: 5px;
	  left: 0;
	  right: 0;
	  overflow: hidden;
	  text-align: center;
	}
	
	.goods-info p {
	  overflow: hidden;
	  text-overflow: ellipsis;
	  white-space: nowrap;
	  margin-bottom: 3px;
	}
	
	.goods-info .price {
	  color: var(--color-high-text);
	  margin-right: 20px;
	}
	
	.goods-info .collect {
	  position: relative;
	}
</style>
