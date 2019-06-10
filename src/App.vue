<template>
  <div class="app">
    <Header />
    <Hero />
    <Listings />
  </div>
</template>
<script>
import Header from "./components/Header";
import Hero from "./components/Hero";
import Listings from "./components/Listings";

export default {
  components: {
    Header,
    Hero,
    Listings
  }
};
</script>
<style lang="sass">
.app 
  background-color: #f1f4f9
</style>
