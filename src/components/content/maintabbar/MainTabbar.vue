<template>
    <div>
      <keep-alive exclude="Detail">
        <router-view></router-view>
      </keep-alive>   
    
      <Tabbar>
        <TabbarItem path="/homepage" activeColor='#1296db'>
          <img slot="item-img" src="@img/tabbar/app-homepage.svg" alt="">
          <img slot="item-img-active" src="@img/tabbar/app-homepage-blue.svg" alt="">
          <div slot="item-text">首页</div>
        </TabbarItem>
        <TabbarItem path="/calendar" activeColor='#1296db'>
          <img slot="item-img" src="@img/tabbar/calendar.svg" alt="">
          <img slot="item-img-active" src="@img/tabbar/calendar-blue.svg" alt="">
          <div slot="item-text">分类</div>
        </TabbarItem>
        <TabbarItem path="/cart" activeColor='#1296db'>
          <img slot="item-img" src="@img/tabbar/add-to-cart.svg" alt="">
          <img slot="item-img-active" src="@img/tabbar/add-to-cart-blue.svg" alt="">
          <div slot="item-text">购物车</div>
        </TabbarItem>
        <TabbarItem path="/account" activeColor='#1296db'>
          <img slot="item-img" src="@img/tabbar/my-account.svg" alt="">
          <img slot="item-img-active" src="@img/tabbar/my-account-blue.svg" alt="">
          <div slot="item-text">我的</div>
        </TabbarItem>
      </Tabbar>
    </div>
</template>

<script>
import Tabbar from '@components/common/tabbar/Tabbar.vue'
import TabbarItem from '@components/common/tabbar/TabbarItem.vue'

export default {    
    name: 'MainTabbar',
    components: {
      Tabbar,
      TabbarItem
    }
}
</script>