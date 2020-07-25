<template>
  <div class="home">
    <HomeSearchBar/>
    <HomeMovieList :movie-list="allMoviesInformation"/>
  </div>
</template>

<script>
	// @ is an alias to /src
	import HomeSearchBar from "../components/Home/HomeSearchBar";
	import HomeMovieList from "../components/Home/HomeMovieList";

	export default {
		name: 'Home',
		components: {
			HomeSearchBar,
			HomeMovieList
		},
		data() {
			return {
				allMoviesInformation: {}
			}
		},
		methods: {
			getMovieListData: function () {
				this.axios.get('/top250api')
						.then((response) => {
							this.allMoviesInformation = response.data
						})
						.catch(reason => {
							console.log(reason)
						})
			}
		},
		created() {
			this.getMovieListData()
		}
	}
</script>
