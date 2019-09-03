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
import Header from "../components/Header";
export default {
  name: "Home",
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
