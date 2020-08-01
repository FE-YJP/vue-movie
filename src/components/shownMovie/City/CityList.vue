<template>
  <div ref="wrapper">
    <v-list>
      <v-list-item-group v-for="(cityGroups,alphabet,index) in cities" :key="index">
        <span v-text="alphabet" class="alphabet"/>
        <v-list-item v-for="city of cityGroups" :key="city.id">
          <v-list-item-content>
            <v-list-item-title v-text="city.name" @click="handleCityClick(city.name)"/>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </div>
</template>

<script>
  import BScroll from "better-scroll"
  import { mapState } from 'vuex'

  export default {
    name: "CityList",
    props: {
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
        this.$router.push('/shownMovie')
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
    border-bottom: 1px solid gray
    height: 48px
    line-height: 48px
    padding: 0 16px
    font-size: 20px
</style>
