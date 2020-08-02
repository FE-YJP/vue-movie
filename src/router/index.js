import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Chart from "../views/Chart";

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home
	},
	{
		path: '/chart',
		name: 'chart',
		component: Chart
	},
	{
		path: '/about',
		name: 'About',
		component: () => import( '../views/About.vue' )
	},
	{
		path: '/city',
		name: 'City',
		component: () => import( '../components/Chart/City.vue' )
	}
]

const router = new VueRouter({
	mode: 'history',
	routes
})

export default router
