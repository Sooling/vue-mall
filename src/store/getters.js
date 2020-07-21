export const getters = {
	cartLength: function(state) {
		return state.cartList.length;
	},
	cartList: function(state) {
		return state.cartList;
	}
}