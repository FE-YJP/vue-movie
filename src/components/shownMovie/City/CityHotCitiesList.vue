<template>
  <v-container>
    <span>热门城市</span>
    <v-row>
      <v-col v-for="item of hotCities"
             :key="item.id"
             cols="4"
      >
        <v-card
          light
        >
          <v-card-text :style="{ textAlign: 'center' }">
            {{ item.name }}
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: "CityHotCitiesList",
    props: {
      hotCities: {
        type: Array,
        required: true
      }
    }
  }
</script>

<style scoped lang="sass">

</style>
