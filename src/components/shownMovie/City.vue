<template>
  <v-container :style="{ padding: 0, position: 'relative' }">
    <!-- 头部搜索框  -->
    <v-toolbar
      width="100%"
      :style="{ position: 'fixed', top: 0, left: 0, 'zIndex': 999 }">
      <v-btn icon to="/shownMovie">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>

      <v-toolbar-title>城市列表</v-toolbar-title>
      <v-spacer />
    </v-toolbar>

    <!--  搜索所在城市  -->
    <v-text-field
      placeholder="输入城市名或拼音"
      append-icon="mdi-magnify"
      solo
      flat
      dense
      hide-details
      :style="{ marginLeft: '12px', marginRight: '12px', marginTop: '68px' }"
    />

    <!-- 热门城市列表  -->
    <CityHotCitiesList :hot-cities="hotCities"/>
    <v-divider />

    <!-- 所有城市列表  -->
    <CityList :cities="cities" ref="wrapper"/>
  </v-container>
</template>

<script>
  import axios from "axios"
  import CityHotCitiesList from "./City/CityHotCitiesList"
  import CityList from "./City/CityList"

  export default {
    name: "City",
    components: {
      CityHotCitiesList,
      CityList
    },
    data() {
      return {
        cities: {}, //  所有城市列表
        hotCities: [],  //  热门城市列表
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
    },
    created() {
      this.getCitiesInfo()
    }
  }
</script>

<style scoped lang="sass">

</style>
