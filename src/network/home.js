// 引入封装好的axios
import {request} from '@network/request.js'

// 导出getHomeMultidata函数
// 目的：在home.vue中引入getHomeMultidata，通过该函数请求数据
export const getHomeMultidata = function(){
	return request({
		url: '/home/multidata'
	})
}

export const getHomeGoods = function(type,page) {
	return request({
		url: '/home/data',
		params: {
			type: type,
			page: page
		}
	})
}