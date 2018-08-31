<template>
  <div>
    <v-jumbotron class="jumbo">
      <v-layout align-center>
        <v-flex>
          <h3 class="display-3">Welcome to Hacktiv-Overflow</h3>
          <span class="subheading">ask anything you want!</span>
          <v-divider class="my-3"></v-divider>
        </v-flex>
      </v-layout>
      <img src="http://bestanimations.com/Fantasy/Dragons/charizard-dragon-animated-gif-2.gif" alt="" srcset="">
    </v-jumbotron>
    <br>
    <br>
    <router-view></router-view>
  </div>
</template>

<script>
  // @ is an alias to /src
  import Navbar from '@/components/Navbar';
  export default {
    name: 'home',
    components: {
      Navbar
    },
  }
</script>

<style>
  .g-signin2 {
    margin-top: 20px;
    margin-left: auto;
    margin-right: auto;
  }
</style>