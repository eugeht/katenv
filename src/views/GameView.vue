<script setup lang="ts">
// Router
import { RouterLink } from 'vue-router'
</script>



<template>
  <main class="game-wrapper">
    <div>
      <RouterLink 
        class="game-wrapper-go-back"
        :to="{ name: 'home' }"
      >
        <svg 
          class="game-wrapper-go-back__arrow"
          width="109" 
          height="75" 
          viewBox="0 0 109 75" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <use xlink:href="#icon-arrow" />
        </svg>
      </RouterLink>
    </div>
    <iframe class="game-wrapper__iframe" src="/game-build/game.html" width="100%" height="100%"/>
  </main>
</template>



<style lang="scss">
  .game-wrapper {
    position: relative;

    width: 100%;
    height: 100vh;
  }

  .game-wrapper-go-back {
    position: absolute;
    z-index: 99999;
    top: 32px;
    left: 32px;
  }

  .game-wrapper-go-back__arrow {
    display: block;
    width: 52px;
    height: 38px;
    color: #FF1212;
  }

  .game-wrapper__iframe {
    position: absolute;
    top: 0;
    left: 0;

    width: 100%;
    height: 100%;
    border: none;
  }
</style>