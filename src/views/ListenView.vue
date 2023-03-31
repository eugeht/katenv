<script setup lang="ts">
// Assets
import AlbumCoverPng from '@/assets/images/wow@2x.png'
import AlbumCoverAvif from '@/assets/images/wow@2x.avif'
import AlbumCoverWebp from '@/assets/images/wow@2x.webp'
</script>



<template>
  <main class="listen">
    
    <div class="listen-cover">
      <picture class="listen-cover-picture">
        <source :srcset="AlbumCoverWebp" type="image/webp" />
        <source :srcset="AlbumCoverAvif" type="image/avif" />
        <img 
          class="listen-cover-picture__img" 
          :src="AlbumCoverPng" 
          width="662"
          height="662"
          alt="WOW album cover"
        />
      </picture>

      <ul class="listen-links listen-links--left">
        <li class="listen-links__item">
          <a href="hhttps://open.spotify.com/album/2uQB2kL4Nr8DxpuKIBYI8M?si=K3kmOVogSUuZnJrSKQeLzw" target="_blank" class="listen-links-link">
            spotify
          </a>
        </li>
        <li class="listen-links__item">
          <a href="http://www.tidal.com/album/259298928?fbclid=PAAaZdGDEa-nbzpi2ea4WZnbae-D51gRuBlcTd3jJsrOHUWR1_xcMKdvT9guo" target="_blank" class="listen-links-link">
            tidal
          </a>
        </li>
        <li class="listen-links__item">
          <a href="https://soundcloud.com/kate-nv/sets/wow-525313527?fbclid=PAAaZdGDEa-nbzpi2ea4WZnbae-D51gRuBlcTd3jJsrOHUWR1_xcMKdvT9guo" target="_blank" class="listen-links-link">
            soundcloud
          </a>
        </li>
      </ul>

      <ul class="listen-links listen-links--right">
        <li class="listen-links__item">
          <a href="https://music.apple.com/us/album/wow/1675578274" target="_blank" class="listen-links-link">
            apple music
          </a>
        </li>
        <li class="listen-links__item">
          <a href="https://katenv.bandcamp.com/album/wow" target="_blank" class="listen-links-link">
            bandcamp
          </a>
        </li>
        <li class="listen-links__item">
          <a href="https://music.youtube.com/playlist?list=OLAK5uy_kTPkLIeMLxMzcd2ABiHDDgGjnBYakpjJA&src=Linkfire&lId=fd06679c-f5c0-4b65-a902-ab14b6f28291&cId=d3d58fd7-4c47-11e6-9fd0-066c3e7a8751&fbclid=PAAaZdGDEa-nbzpi2ea4WZnbae-D51gRuBlcTd3jJsrOHUWR1_xcMKdvT9guo" target="_blank" class="listen-links-link">
            youtube music
          </a>
        </li>
      </ul>
    </div>

    <!-- <TheNavigation /> -->
  </main>
</template>



<style lang="scss">
  .listen {
    position: relative;

    display: flex;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: #FFEA2D;
  }

  .listen-cover {
    position: relative;

    height: auto;
    margin: auto;
    padding-bottom: 3rem;

    @media only screen and (min-width: 900px) {
      padding: 0;
    }
  }
  
  .listen-cover-picture {
    max-width: 80vw;
    max-height: 60vh;
    aspect-ratio: 1 / 1;

    @media only screen and (min-width: 900px) {
      max-width: 40vw;
      max-height: 60vh;
    }
  }

  .listen-cover-picture__img {
    display: block;
  }


  .listen-links {
    position: relative;
    top: 0;

    display: flex;
    height: 100%;
    padding: 0;
    margin: 0;

    flex-direction: column;
    justify-content: space-around;
    list-style: none;

    @media only screen and (min-width: 900px) {
      position: absolute;
    }

    &.listen-links--left {
      right: 60%;

      margin: 3rem 0 -25%;
      text-align: right;
      
      @media only screen and (min-width: 900px) {
        right: 110%;

        margin: 0;
      }
    }

    &.listen-links--right {
      left: 50%;
      text-align: left;
      
      @media only screen and (min-width: 900px) {
        left: 110%;
      }
    }
  }

  .listen-links__item {
    white-space: nowrap;
    font-size: rem(16px);
    
    @media only screen and (min-width: 380px) {
      font-size: rem(22px);
    }
    

    .listen-links.listen-links--left & {
      transform-origin: 100% 50%;

      &:nth-child(1) {
        transform: rotate(15deg);
      }

      &:nth-child(2) {
        transform: rotate(4deg);
      }

      &:nth-child(3) {
        transform: rotate(-18deg);
      }
    }

    .listen-links.listen-links--right & {
      transform-origin: 0% 50%;
  
      &:nth-child(1) {
        transform: rotate(-15deg);
      }

      &:nth-child(2) {
        transform: rotate(-4deg);
      }

      &:nth-child(3) {
        transform: rotate(18deg);
      }
    }
  }

  .listen-links-link {
    text-decoration: none;
    transition: all 0.3s ease-in-out, text-underline-offset 0.2s ease-in-out;
    
    &:hover {
      text-decoration: underline;
      text-decoration-thickness: 1px;
      text-underline-offset: 3px;
    }
  }
</style>