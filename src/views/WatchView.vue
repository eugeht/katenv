<script setup lang="ts">
// Vue
import { ref, type Ref } from 'vue'
// Light youtube
import LiteYouTubeEmbed from 'vue-lite-youtube-embed'
import 'vue-lite-youtube-embed/style.css'
// Assets
import ChatHeart from '@/assets/images/heart.gif'


// ..
const checkWebpFeature = ( feature: string, cb: ( feature: string, reslt: boolean ) => void ) => {
  const kTestImages: {
    [ propName: string ]: string
  } = {
    lossy     : 'UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA',
    lossless  : 'UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==',
    alpha     : 'UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAARBxAR/Q9ERP8DAABWUDggGAAAABQBAJ0BKgEAAQAAAP4AAA3AAP7mtQAAAA==',
    animation : 'UklGRlIAAABXRUJQVlA4WAoAAAASAAAAAAAAAAAAQU5JTQYAAAD/////AABBTk1GJgAAAAAAAAAAAAAAAAAAAGQAAABWUDhMDQAAAC8AAAAQBxAREYiI/gcA',
  }

  const img = new Image()
  img.onload = function () {
    const result = ( img.width > 0 ) && ( img.height > 0 )
    cb( feature, result )
  }
  img.onerror = function () {
    cb( feature, false )
  }

  img.src = `data:image/webp;base64,${ kTestImages[ feature ] }`;
}


const isWebpSupported: Ref<boolean | undefined> = ref( undefined )

checkWebpFeature( 'lossy' , ( feature, isSupported ) => {
  isWebpSupported.value = !!isSupported
} )

</script>



<template>
  <main class="watch">
    <Transition name="fade">
      <div v-if="isWebpSupported !== undefined">
        <LiteYouTubeEmbed
          id="AQf84KubJjE"
          title="meow chat"
          poster="maxresdefault"
          :webp="isWebpSupported"
        />
        <img 
          class="watch-divider" 
          :src="ChatHeart" 
          width="110"
          height="110"
          alt="heart picture"
        />
        <LiteYouTubeEmbed
          id="s4euYMd4-l0"
          title="oni (they)"
          poster="maxresdefault"
          :webp="isWebpSupported"
        />
        <img 
          class="watch-divider" 
          :src="ChatHeart" 
          width="110"
          height="110"
          alt="heart picture"
        />
        <LiteYouTubeEmbed
          id="86UHdsbNZKs"
          title="early bird"
          poster="maxresdefault"
          :webp="isWebpSupported"
        />
        <img 
          class="watch-divider" 
          :src="ChatHeart" 
          width="110"
          height="110"
          alt="heart picture"
        />
        <LiteYouTubeEmbed
          id="R5iNYIEGPiw"
          title="thinking"
          poster="maxresdefault"
          :webp="isWebpSupported"
        />
      </div>
    </Transition>
  </main>
</template>



<style lang="scss">
  .watch {
    position: relative;

    width: 100%;
    height: 100%;
    overflow: auto;
    padding: 0 0 3rem;
  }

  .watch-divider {
    margin: 0 auto 0 auto;
  }

  // .yt-lite {
  //   margin-bottom: 10vh;
  // }

  .yt-lite::before {
    background: none !important;
  }
</style>