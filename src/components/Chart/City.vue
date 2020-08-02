<template>
  <v-container>
    <!-- 头部工具栏  -->
    <v-toolbar>
      <v-btn icon to="/chart">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <v-toolbar-title>城市列表</v-toolbar-title>
      <v-spacer />
    </v-toolbar>

    <!--  搜索所在城市  -->
    <v-text-field
      placeholder="输入城市名或拼音"
      append-icon="mdi-magnify" solo flat dense hide-details clearable
      v-model="theSearchCity"
      @click:append="searchCity(theSearchCity)"
      @focus="showCityList = !showCityList"
      @blur="clearResult"
    />

    <!-- 所有城市列表 + 热门城市列表 或者 用户搜索后得到的城市列表  -->
    <div class="wrapper">
      <CityList :cities="cities" :hot-cities="hotCities" v-show="showCityList"/>

      <v-list v-show="!showCityList">
        <v-list-item-group light v-if="this.hasResult">
          <v-list-item
            v-for="item of citiesResult" :key="item.id"
          >
            <v-list-item-title v-text="item.name" @click="handleCityClick(item.name)" />
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </div>
  </v-container>
</template>

<script>
  import axios from "axios"
  import CityList from "./City/CityList"

  export default {
    name: "City",
    components: {
      CityList
    },
    data() {
      return {
        cities: {}, //  所有城市列表
        hotCities: [],  //  热门城市列表
        theSearchCity: null,  //  用户搜索城市关键词
        citiesResult: [], //  搜索结果
        hasResult: false, //  是否有搜索结果
        showCityList: true,
      }
    },
    methods: {
      getCitiesInfo: function () {
        // 获取所有城市综合列表和热门城市
        axios.get('/citiesApi/city.json')
          .then(this.handleGetCityInfoSuccess)
      },

      handleGetCityInfoSuccess: function (res) {
        //  获取成功后的处理
        res = res.data.data
        this.cities = res.cities
        this.hotCities = res.hotCities
      },

      searchCity: function (keyword) {
        //  搜索城市
        for (const i in this.cities) {
          this.cities[i].forEach((value) => {
            if (value.spell.indexOf(keyword) > -1 || value.name.indexOf(this.keyword) > -1) {
              this.citiesResult.push(value)
              this.hasResult = true
            }
          })
        }
      },

      clearResult: function () {
        // 当输入框失去焦点，则清空搜索结果
        this.showCityList = !this.showCityList
        this.hasResult = false
        this.citiesResult.splice(0)
      },

      handleCityClick: function (city) {
        this.$store.dispatch('changeCity', city)
        this.$router.push('/chart')
      }
    },
    created() {
      this.getCitiesInfo()
    }
  }
</script>

<style scoped lang="sass">
  .v-toolbar
    width: 100%
    position: fixed
    top: 0
    left: 0
    z-index: 999
  .v-input
    margin: 56px 12px 0 12px
  .v-list
    margin: 12px 12px 0 12px
    border-radius: 4px
</style>
