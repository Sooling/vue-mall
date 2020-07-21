<template>
    <!-- TabbarItme -->
    <div class="tab-bar-item" @click="itemClick">
        <!-- 包装插槽 -->
        <div v-if="!isActive"><slot name="item-img"></slot></div>
        <div v-else><slot name="item-img-active"></slot></div>
        <!-- <div :class="{active: isActive}"><slot name="item-text"></slot></div> -->
        <div :style="isActiveColor"><slot name="item-text"></slot></div>
    </div>
</template>

<script>
export default {
    name: 'TabbarItem',
    data() {
        return {
            //isActive: false,
            link: this.path,//2.将从MainTabbar.vue中传过来的数据赋给当前组件data的link属性
            active: this.activeColor
        }
    },
    props: {
        path: {//1.MainTabbar.vue中的数据传递到这里
            type: String
        },
        activeColor: {
            type: String,
            default: '#1296db'
        }
    },
    methods: {
        itemClick(){
            // console.log(this.link);
						// 一次点击,输出一个值
            this.$router.replace(this.link);
            //1.是因为点击让this.link的数据发生改变吗？
            //结合2，可以这么认为
            //因为点击就会调用script中的代码，相当于使用一次组件，就会将path数据传递
            //this.isActive = true;
        }
    },
    computed: {//计算属性中的方法都是自执行的，而且返回值会被缓存
        isActive(){
            // 判断是否处于活页状态
            // console.log(this.link);
            //2.一次点击，依次输出四个值
            // /homepage
            // /calendar
            // /cart
            // /account
            //也就是说每使用一次组件，就调用一次script中的代码
            //传递一次数据
						// console.log(this.$route.path);
						// 输出/cart，输出4次
            return this.$route.path.indexOf(this.link) !== -1;
        },
        isActiveColor(){
            return this.isActive ? {color: this.active} : {};
        }
    },
}
</script>

<style scoped>
    .tab-bar-item{
        flex: 1;
        text-align: center;
        height: 49px;        
    }
    .tab-bar-item img{
        width: 20px;
        height: 20px;
        vertical-align: middle;
        margin-top: 4px;
        margin-bottom: 4px;
    }
    .tab-bar-item div{
        font-size: 12px;
    }
</style>