<template>
  <div>
    <v-container>
      <!--  热门城市列表  -->
      <span>热门城市</span>
      <v-row>
        <v-col
          v-for="item of hotCities" :key="item.id" cols="4"
        >
          <v-card
            light @click="handleCityClick(item.name)"
          >
            <v-card-text :style="{ textAlign: 'center' }">
              {{ item.name }}
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <v-divider />

    <div ref="wrapper">
      <!--  所有城市列表  -->
      <v-list>
        <!-- 城市缩写大写拼音 -->
        <v-list-item-group v-for="(cityGroups,alphabet,index) in cities" :key="index">
          <span v-text="alphabet" class="alphabet"/>
          <!-- 每个城市 -->
          <v-list-item v-for="city of cityGroups" :key="city.id">
            <v-list-item-content>
              <v-list-item-title v-text="city.name" @click="handleCityClick(city.name)"/>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </div>
  </div>
</template>

<script>
  import BScroll from "better-scroll"
  import { mapState } from 'vuex'

  export default {
    name: "CityList",
    props: {
      hotCities: {
        type: Array,
        required: true
      },
      cities: {
        type: Object,
        required: true
      },
    },
    computed: {
      ...mapState(['city'])
    },
    methods: {
      handleCityClick: function (city) {
        this.$store.dispatch('changeCity', city)
        this.$router.push('/chart')
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.scroll = new BScroll(this.$refs.wrapper, {})
      })
    }
  }
</script>

<style scoped lang="sass">
  .alphabet
    display: block
    border-bottom: 1px solid #607D8B
    height: 48px
    line-height: 48px
    padding: 0 16px
    font-size: 20px
</style>
