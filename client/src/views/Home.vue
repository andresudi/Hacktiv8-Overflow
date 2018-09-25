<template>
  <div>
      <router-view></router-view>
  </div>
</template>

<script>
  // @ is an alias to /src
  import Navbar from '@/components/Navbar';
  import LandingPage from '@/components/LandingPage'
  export default {
    name: 'home',
    components: {
      Navbar,
      LandingPage
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