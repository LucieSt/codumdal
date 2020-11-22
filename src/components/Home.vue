<template>
  <div class="home-component">
    <div class="home-container">

      <div class="home-img">
      </div>

      <h1>codůmdal</h1>

      <h2>Zadejte ingredience, které máte doma:</h2>

      <!-- client_id (soundcloud): "j34j8UCuL4LaOnjnyNb8VBOStI1RrtPI" -->

      <!-- <div id="player"></div> -->

      <!-- Bude tu hlavne vyhledavani receptu podle zadanych ingredienci, mozna nejake graficke demo, jak na to. Tri obrazky vedle sebe? 1. ruka drzi pivo, 2. "Sele na pivu: mate pivo, chybi sele" 3. ?? -->
      <listed-recipes/>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

import ListedRecipes from '@/components/ListedRecipes.vue'

// var YouTubeIframeLoader = require('youtube-iframe')

export default {
  components: {
    ListedRecipes
  },
  name: 'Home',
  created () { // probably not working anyway when using keepalive on this component
    // YouTubeIframeLoader.load(function (YT) {
    //   // eslint-disable-next-line no-new
    //   new YT.Player('player', {
    //     height: '390',
    //     width: '640',
    //     videoId: 'M7lc1UVf-VE'
    //   })
    // })
  }
}
</script>

<style scoped>
  .home-img {
    background-image: url(./../../src/assets/redkvicka.png);
    width: 200px;
    background-repeat: no-repeat;
    background-size: contain;
    height: 300px;
    position: fixed;
    left: 0px;
  }
</style>
