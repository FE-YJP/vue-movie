<template>
  <div class="movieItemList">
    <v-card class="movieItem" v-for="item of listData" :key="item.id">
      <div class="movieItemLeft">
        <v-card-title
            class="headline"
            :href="item.alt"
            v-text="item.title"/>
        <v-card-subtitle class="movieItemYear">{{ item.year }}（{{ item.directors[0].name }}）</v-card-subtitle>
        <div class="movieItemInformation">
          <div class="rating">
            <v-rating
                background-color="orange"
                color="orange lighten-3"
                small
                dense
                half-increments
                :value=movieRating(item)
                readonly
                class="movieItemRating"
            />
            <span>{{ item.rating.average }}</span>
          </div>

            <p class="actorsName">{{ item.durations[0] }} / {{ item.genres[0] }} / {{ item.genres[1] }}</p>
            <p class="actorsName">主演:</p>
            <p v-for="name of actorsName(item)" v-text="name.name" :key="name.id" class="actorsName"></p>
        </div>
      </div>


      <img :src="movieImg(item)" referrerpolicy="no-referrer" class="movieItemRight" alt="">
    </v-card>
  </div>
</template>

<script>
	export default {
		name: "HomeMovieList",
		props: {
			MovieList: {}
		},
		data() {
			return {
				listData: {}
			}
		},
		methods: {
			movieImg: function (item) {
				return item.images.small
			},
			actorsName: function (item) {
				return item.casts
			},
			movieRating: function (item) {
				return Math.floor(item.rating.average) / 2
			}
		},
		watch: {
			MovieList(n) {
				this.listData = n.subjects.slice(0,10)
			}
		}
	}
</script>

<style scoped lang="sass">
  .movieItemList
    max-height: 100vh
    // 使用overflow必须指明height或者max-height
    overflow: scroll
  .movieItem
    margin: 16px
    display: flex
    justify-content: space-between
    .movieItemYear
      padding-bottom: 0
    .movieItemInformation
      padding: 0 16px 16px 16px
      .rating
        display: flex
        font-size: 14px
      .actorsName
        margin-bottom: 0
  .movieItemRight
    display: block
    width: 135px
    height: 200px
    margin: 16px 16px 16px 0
    border-radius: 3px
</style>
