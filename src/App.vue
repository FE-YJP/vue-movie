<template>
  <v-app>
    <v-main app :style="{ 'backgroundColor': '#F5F5F5' }">
      <keep-alive>
        <router-view/>
      </keep-alive>
    </v-main>

    <v-bottom-navigation
      :value="activeBtn"
      grow
      color="cyan darken-2"
      app
    >
      <v-btn value="Home" to="/">
        <span>电影仓库</span>
        <v-icon>mdi-movie-search-outline</v-icon>
      </v-btn>
      <v-btn value="shownMovie" to="shownMovie">
        <span>热映电影</span>
        <v-icon>mdi-movie-filter-outline</v-icon>
      </v-btn>
      <v-btn value="About" to="/about">
        <span>我的</span>
        <v-icon>mdi-account-outline</v-icon>
      </v-btn>
    </v-bottom-navigation>

  </v-app>
</template>

<script>
	export default {
		name: 'App',
		data: () => ({
			activeBtn: 'Home'
		}),
	};
</script>

<style lang="sass">
  /*  底部导航栏中的按钮不能继承导航栏的高度，不添加下面的css会导致按钮缩小  */
  .v-item-group.v-bottom-navigation .v-btn.v-size--default
    height: inherit
</style>
