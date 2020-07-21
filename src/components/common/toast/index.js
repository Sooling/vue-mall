import Toast from './Toast.vue'
const obj = {}

// 安装toast，执行install函数，内部自动传入一个参数
// vue对象
// 在install函数中进行toast插件的初始化工作
obj.install = function(vue) {
	// console.log(Toast.$el)
	// 输出undefined，说明执行install函数时，Toast.$el还没有挂载
	// 说明需要创建组件构造器
	
	// 1.创建组件构造器，相当于创建一个类
	const ToastConstructor = vue.extend(Toast);
	
	// 2.new的方式，根据组件构造器，可以创建一个组件对象
	const toast = new ToastConstructor();
	
	// 3.将组件对象手动挂载到某一个元素上，这里手动创建一个div
	// 此时toast对象的$el为该div
	toast.$mount(document.createElement('div'));
		
	// 4.将组件对象的$el加到body中
	document.body.appendChild(toast.$el);	
	// 内部渲染机制：将组件对象手动挂载到div上，组件模板中的DOM元素会替换该div
	
	vue.prototype.$toast = toast;
}

export default obj