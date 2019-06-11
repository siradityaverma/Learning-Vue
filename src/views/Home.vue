<template>
  <div class="app">
    <Header />
    <Hero />
    <Listings />
  </div>
</template>
<script>
import Hero from "../components/Hero";
import Listings from "../components/Listings";

export default {
  name: 'home',
  components: {
    Hero,
    Listings
  }
};
</script>
<style lang="sass">
.app 
  background-color: #f1f4f9
</style>