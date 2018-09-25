<template>
  <div id="app">
    <Navbar></Navbar>
    <div style="min-height: 730px;">
      <router-view></router-view>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
  import Navbar from '@/components/Navbar';
  import Footer from '@/components/Footer';
  export default {
    components: {
      Navbar,
      Footer
    },
  }
</script>

<style>
  @import "~vue-wysiwyg/dist/vueWysiwyg.css";
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
  
  body {
    background-attachment: fixed;
  }
  
  #nav {
    padding: 30px;
  }
  
  #nav a {
    font-weight: bold;
    color: #2c3e50;
  }
  
  #nav a.router-link-exact-active {
    color: #42b983;
  }
</style>
