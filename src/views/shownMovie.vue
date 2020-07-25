<template>
  <div>
    <!--  顶部导航栏   -->
    <v-toolbar>
      <v-app-bar-nav-icon/>
      <v-toolbar-title>热映电影</v-toolbar-title>
      <v-spacer/>
      <v-btn text>
        <v-icon>mdi-map-marker</v-icon>
        揭阳
      </v-btn>
    </v-toolbar>

    <v-container fluid>
      <v-subheader :style="{ fontSize: '16px' }">{{ time }}</v-subheader>
      <!-- 当前正在北美热映的电影 -->
      <v-card v-if="usHotMovie">
        <v-card-title>
          北美票房榜单
          <v-spacer/>
          <span :style="{ fontSize: '14px' }">{{ usHotMovieUpdateTime }}</span>
        </v-card-title>
        <v-card-text>
          <v-row v-for="item of usHotMovieInformation()" :key="item.rank">
            <v-col cols="2">{{ item.rank }}</v-col>
            <v-col cols="5">{{ item.title }}</v-col>
            <v-col cols="2">{{ item.average }}</v-col>
            <v-col cols="3">{{ boxValue(item.box) + '万元' }}</v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-container>
  </div>
</template>

<script>
	import axios from 'axios'

	export default {
		name: "OnViewMovie",
		data () {
			return {
				time: '',  //  当前时间
				city: '',  // 当前定位城市
        hotMovie: {}, //  当前大陆热播电影榜单
        usHotMovie: null, // 当前欧美热映电影榜单
        usHotMovieUpdateTime: ''  // 当前欧美热映电影榜单更新时间
			}
		},
		methods: {
      usHotMovieInformation: function () {
        let results = []
        for (const item of this.usHotMovie) {
          // 把每个电影的名字和评分构成一个新的对象
          const result = {
            title: '',
            rank: '',
            average: '',
            box: ''
          }
          result.title = item.subject.title
          result.rank = item.rank
          result.average = item.subject.rating.average
          result.box = item.box
          results.push(result)
        }
        return results
      },

      boxValue: function (value) {
        // 把票房后四位截断，只保留前面几位数，单位为万元
        return value.toString().split('').slice(0,-4).join('')
      },

			getLocalDate: function () {
				// 获取当地时间
        const today = new Date()
        this.time = today.toLocaleDateString()
      },

			getShownMovie: function () {
				// 获取豆瓣API的当前正在上映的电影
				axios.get("/hotMovieApi")
						.then(res => {
              this.hotMovie = res.data
						})
						.catch( error =>  console.log(error) )
			},

      getUShotMovie: function () {
        // 获取豆瓣API的当前北美正在上映的电影
        axios.get("/UShotMovieApi")
            .then(res => {
              this.usHotMovie = res.data.subjects
              this.usHotMovieUpdateTime = res.data.date
            })
            .catch( error => { console.log(error) })
      }
		},
		created() {
			this.getLocalDate()
			this.getShownMovie()
      this.getUShotMovie()
		}
	}
</script>

<style scoped lang="sass">

</style>
