<template>
  <v-toolbar>
    <v-text-field
        prepend-inner-icon="mdi-magnify"
        filled
        rounded
        dense
        hide-details
        placeholder="今天想看什么电影？"
    ></v-text-field>
    <v-btn icon color="light-blue">
      <v-icon>mdi-email-outline</v-icon>
    </v-btn>
  </v-toolbar>
</template>

<script>
	export default {
		name: "HomeSearchBar"
	}
</script>

<style scoped lang="sass">

</style>
