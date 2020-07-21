<template>
	<div class="bottom-menu">
	  <CheckButton 
		id="select-all" 
		:class="{checkedAll: checkedAll}"
		@click.native="changeAll"/>
	  <span>全选</span>
	  <span class="total-price">合计: ￥{{totalPrice}}</span>
	  <span class="buy-product" @click="settle">去计算({{settleNum}})</span>
	</div>
</template>

<script>
	import CheckButton from '@components/common/checkbutton/CheckButton.vue'
	import {mapGetters} from 'vuex'
	
	export default {
		name: 'CartBottomBar',
		components: {
			CheckButton
		},
		data() {
			return {
				isCheckedAll: false
			}
		},
		computed: {
			...mapGetters([
				'cartList'
			]),
			totalPrice: function() {
				// 显示要结算的总价格
				return this.cartList
				.filter(item => item.isChecked)
				.reduce((preValue,item) => {
					return preValue + item.newPrice * item.count;
				},0).toFixed(2);
			},
			settleNum: function() {
				// 显示选中的商品的总数目
				return this.cartList.filter(item => item.isChecked).length;
			},
			checkedAll: function() {
				// 默认状态下购物车数目为0，返回false
				// 且选中商品的数目和商品总数目相等时返回true
				if(this.cartList.filter(item => item.isChecked).length > 0 && this.cartList.filter(item => item.isChecked).length === this.cartList.length) {
					this.isCheckedAll = true;
					return this.isCheckedAll;
				}else{
					this.isCheckedAll = false;
					return this.isCheckedAll;
				}
			}
		},
		methods: {
			changeAll: function() {
				if(this.cartList.length !== 0){
					if(this.isCheckedAll){
						// 如果处于全选状态就不全选
						for(let i = 0;i < this.cartList.length;i ++){
							this.$store.commit('notAllSelected',i)
						}
					}else{
						for(let i = 0;i < this.cartList.length;i ++){
							this.$store.commit('allSelected',i)
						}
					}
				}
			},
			settle: function() {
				if(this.cartList.filter(item => item.isChecked).length === 0){
					this.$toast.toastShow('请先选择商品',1500);
				}
			}
		}
	}
</script>

<style scoped="scoped">
	.bottom-menu {
	  width: 100%;
	  height: 44px;
	  background-color: #eee;
	  position: fixed;
	  bottom: 49px;
	  left: 0;
	  box-shadow: 0 -2px 3px rgba(0, 0, 0, .2);
	  font-size: 14px;
	  color: #888;
	  line-height: 44px;
	  padding-left: 35px;
	  box-sizing: border-box;
	}
	
	#select-all {
	  position: absolute;
	  line-height: 0;
	  left: 12px;
	  top: 13px;
	}
	
	.checkedAll{
		background-color: #FF6699;
	}
	
	.bottom-menu .total-price {
	  margin-left: 15px;
	  font-size: 16px;
	  color: #666;
	}
	
	.bottom-menu .buy-product {
	  background-color: orangered;
	  color: #fff;
	  width: 100px;
	  height: 44px;
	  text-align: center;
	  line-height: 44px;
	  float: right;
	}
</style>
