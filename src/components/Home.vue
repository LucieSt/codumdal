<template>
  <div class="home-component">
    <div class="home-container">

      <h1>codůmdal</h1>

      <!-- <iframe src="https://open.spotify.com/embed/track/1v1oIWf2Xgh54kIWuKsDf6" width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe> -->

      <!-- <iframe width="100%" height="166" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/240233494&color=%23ff5500&auto_play=true&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"></iframe><div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;"><a href="https://soundcloud.com/mrsuicidesheep" title="MrSuicideSheep" target="_blank" style="color: #cccccc; text-decoration: none;">MrSuicideSheep</a> · <a href="https://soundcloud.com/mrsuicidesheep/novo-amor-anchor" title="Novo Amor - Anchor" target="_blank" style="color: #cccccc; text-decoration: none;">Novo Amor - Anchor</a></div> -->

      <!-- client_id: "j34j8UCuL4LaOnjnyNb8VBOStI1RrtPI" -->

      <div id="player"></div>

      <!-- Bude tu hlavne vyhledavani receptu podle zadanych ingredienci, mozna nejake graficke demo, jak na to. Tri obrazky vedle sebe? 1. ruka drzi pivo, 2. "Sele na pivu: mate pivo, chybi sele" 3. ?? -->
      <listed-recipes/>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

import ListedRecipes from '@/components/ListedRecipes.vue'
import YouTubePlayer from 'youtube-player'

// const tag = document.createElement('script')
// tag.src = 'https://www.youtube.com/iframe_api'
// const firstScriptTag = document.getElementsByTagName('script')[0]
// firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)
// var player
// function onYouTubeIframeAPIReady () {
//   player = new YT.Player('player', {
//     height: '360',
//     width: '640',
//     videoId: 'M7lc1UVf-VE',
//     events: {
//       onReady: onPlayerReady,
//       onStateChange: onPlayerStateChange
//     }
//   })
// }
// function onPlayerReady (event) {
//   event.target.playVideo()
// }
// var done = false
// function onPlayerStateChange (event) {
//   if (event.data === YT.PlayerState.PLAYING && !done) {
//     setTimeout(stopVideo, 6000)
//     done = true
//   }
// }
// function stopVideo () {
//   player.stopVideo()
// }
// youtube

// variable for your API_KEY
// const YOUTUBE_API_KEY = 'AIzaSyCjoCMrmwn51fWlSVh_oRF9TZx5XB1D-2g'
// url from YouTube docs modified for my random term and API key,
// const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=Adele&key=${YOUTUBE_API_KEY}`

// youtube

// var YouTubeIframeLoader = require('youtube-iframe')

export default {
  data () {
    return {
      // eslint-disable-next-line no-new-wrappers
      vidID: 'qeyWBFvKQSQ'
    }
  },
  components: {
    ListedRecipes
  },
  name: 'Home',
  created () {
    // YouTubeIframeLoader.load(function (YT) {
    //   // eslint-disable-next-line no-new
    //   new YT.Player('player', {
    //     height: '390',
    //     width: '640',
    //     videoId: 'M7lc1UVf-VE'
    //   })
    // })
  },
  mounted () {
    console.log('mounted')
    const player = YouTubePlayer('player')
    player.loadVideoById(this.vidID)
  }
}
</script>
