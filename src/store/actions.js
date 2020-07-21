export const actions = {
	addToCart: function(context,payload) {
		return new Promise((resolve) => {
			let oldProduct = null;
			// 第一次for of循环，由于cartList数组为空
			// 所以不会进入循环体
			for(let item of context.state.cartList){
				// console.log(item);
				if(item.iid === payload.iid){
					oldProduct = item;
				}
			}
			
			if(oldProduct){
				// oldPruduct.count += 1;
				// 由于指针的关系，修改oldProduct中属性的值
				// 相当于修改item中属性的值（代码第10行）
				context.commit('addOne',oldProduct);
				resolve('商品数量+1');
			}else{
				payload.count = 1;
				// context.state.cartList.push(payload);
				context.commit('addCart',payload);
				resolve('成功加入购物车');
			}
		})
		
		// const obj = {
		// 	age: 23
		// };
		// const anotherObj = obj;
		// anotherObj.age += 1;
		// console.log(obj.age);
		// 输出24
	}
}