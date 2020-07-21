export const mutations = {
	addCart: function(state,payload) {
		// 默认加入购物车处于选中状态
		payload.isChecked = true;
		state.cartList.push(payload);
	},
	addOne: function(state,payload) {
		payload.count += 1;
	},
	changeCheck: function(state,payload) {
		// 变更购物车列表选中状态
		state.cartList[payload].isChecked = !state.cartList[payload].isChecked;
	},
	notAllSelected: function(state,payload) {
		state.cartList[payload].isChecked = false;
	},
	allSelected: function(state,payload) {
		state.cartList[payload].isChecked = true;
	}
}