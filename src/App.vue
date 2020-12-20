<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        The Worst Competition
      </div>
      <v-spacer></v-spacer>
      <v-btn>Goku</v-btn>
    </v-app-bar>
    <v-main>
        <router-view />
    </v-main>
    <v-footer fixed>
			<div>
				&copy; {{$dayjs().format("YYYY")}}
				<a href="https://www.hauntedbees.com" target="_blank">Haunted Bees Productions</a>
				•
				<router-link to="/about">About</router-link>
				•
				<router-link to="/rules">Rules</router-link>
			</div>
    </v-footer>
  </v-app>
</template>
<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  name: 'App',
  data: () => ({
  })
});
</script>